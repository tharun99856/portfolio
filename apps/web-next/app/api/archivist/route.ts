import Anthropic from '@anthropic-ai/sdk'
import { retrieve, extractiveAnswer, NO_RECORD, SYSTEM_PROMPT, DOC_BY_ID } from '@/lib/archivist'

// The Archivist answers from the portfolio record only.
// With GROQ_API_KEY (preferred) or ANTHROPIC_API_KEY set, a model writes the
// answer from the retrieved records. Without a key, or if the call fails, the endpoint returns
// extractive quotes from the same records, so the desk never goes dark.

const MAX_Q = 600
const WINDOW_MS = 10 * 60 * 1000
const LIMIT = 24
const hits = new Map<string, number[]>()

function limited(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > LIMIT
}

type Turn = { role: 'user' | 'assistant'; content: string }

const cite = (text: string) => {
  const ids = [...new Set([...text.matchAll(/\[([A-Z]{2,7}(?:-[A-Z0-9]{1,3})?)\]/g)].map((m) => m[1]))]
  return ids.filter((id) => DOC_BY_ID[id]).map((id) => ({ id, title: DOC_BY_ID[id].title, href: DOC_BY_ID[id].href }))
}

// Normalise citation styles and drop any tag that isn't a real record (e.g. [NONE]).
const tidy = (text: string) =>
  text
    .replace(/【\s*([A-Z]{2,7}(?:-[A-Z0-9]{1,3})?)[^】]*】/g, '[$1]')
    .replace(/\s*\[([A-Z]{2,7}(?:-[A-Z0-9]{1,3})?)\]/g, (m, id) => (DOC_BY_ID[id] ? m : ''))
    .replace(/[ \t]{2,}/g, ' ')
    .trim()

function offline(question: string, found: ReturnType<typeof retrieve>) {
  const ex = extractiveAnswer(question, found)
  const answer = ex ? ex.text : NO_RECORD
  return { answer, citations: cite(answer), mode: 'index' as const }
}

// Groq (OpenAI-compatible chat completions). Model can be overridden with GROQ_MODEL.
const GROQ_MODEL = process.env.GROQ_MODEL || 'openai/gpt-oss-120b'

async function askGroq(history: Turn[], records: string, question: string): Promise<string | null> {
  try {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.GROQ_API_KEY}` },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...history,
          { role: 'user', content: `RECORDS:\n${records}\n\nVISITOR'S QUESTION:\n${question}` }
        ],
        temperature: 0,
        max_completion_tokens: 3000,
        ...(GROQ_MODEL.startsWith('openai/gpt-oss') ? { reasoning_effort: 'high' } : {})
      }),
      signal: AbortSignal.timeout(25000)
    })
    if (!res.ok) {
      console.error('[archivist] groq call failed:', res.status, (await res.text()).slice(0, 300))
      return null
    }
    const data = await res.json()
    const text = data?.choices?.[0]?.message?.content
    if (typeof text !== 'string' || !text.trim()) return null
    return tidy(text) || null
  } catch (err) {
    console.error('[archivist] groq call error:', err)
    return null
  }
}

let client: Anthropic | null = null
const getClient = () => (client ??= new Anthropic())

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local'
  if (limited(ip)) {
    return Response.json({ answer: 'The reading room is busy. Please try again in a few minutes.', citations: [], mode: 'index' }, { status: 429 })
  }

  let body: { question?: unknown; history?: unknown }
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400 })
  }
  const question = typeof body.question === 'string' ? body.question.trim().slice(0, MAX_Q) : ''
  if (!question) return Response.json({ error: 'Ask a question.' }, { status: 400 })

  const history: Turn[] = Array.isArray(body.history)
    ? (body.history as Turn[])
        .filter((t) => t && (t.role === 'user' || t.role === 'assistant') && typeof t.content === 'string')
        .slice(-6)
        .map((t) => ({ role: t.role, content: t.content.slice(0, MAX_Q) }))
    : []

  // Retrieve with the previous question too, so follow-ups ("and its limitations?") keep their subject.
  const lastUser = [...history].reverse().find((t) => t.role === 'user')?.content || ''
  const found = retrieve(`${question} ${lastUser}`, 8)

  const records = found.length
    ? found.map(({ doc }) => `<record id="${doc.id}" title="${doc.title}">\n${doc.text}\n</record>`).join('\n')
    : '(No records matched this question.)'

  // Preferred: Groq. Falls through to Claude (if configured) and then to quoting the records.
  if (process.env.GROQ_API_KEY) {
    const answer = await askGroq(history, records, question)
    if (answer) return Response.json({ answer, citations: cite(answer), mode: 'model' })
  }

  if (!process.env.ANTHROPIC_API_KEY) return Response.json(offline(question, found))

  // Prior turns are passed as plain alternating messages; the records travel with the newest question only.
  const messages: Anthropic.Beta.BetaMessageParam[] = [
    ...history.map((t) => ({ role: t.role, content: t.content })),
    { role: 'user', content: `RECORDS:\n${records}\n\nVISITOR'S QUESTION:\n${question}` }
  ]
  // The API requires the conversation to start with a user turn.
  while (messages.length && messages[0].role !== 'user') messages.shift()

  try {
    const response = await getClient().beta.messages.create({
      model: 'claude-opus-5-5',
      max_tokens: 1500,
      system: SYSTEM_PROMPT,
      messages,
      output_config: { effort: 'low' },
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: 'default'
    } as Anthropic.Beta.MessageCreateParamsNonStreaming)

    if (response.stop_reason === 'refusal') return Response.json(offline(question, found))

    const answer = response.content
      .filter((b): b is Anthropic.Beta.BetaTextBlock => b.type === 'text')
      .map((b) => b.text)
      .join('')
    const clean = tidy(answer)
    if (!clean) return Response.json(offline(question, found))
    return Response.json({ answer: clean, citations: cite(clean), mode: 'model' })
  } catch (err) {
    if (err instanceof Anthropic.RateLimitError || err instanceof Anthropic.APIConnectionError || err instanceof Anthropic.APIError) {
      console.error('[archivist] model call failed:', err.message)
    } else {
      console.error('[archivist] unexpected error:', err)
    }
    return Response.json(offline(question, found))
  }
}
