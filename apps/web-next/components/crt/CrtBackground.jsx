'use client';

import { useEffect, useRef } from 'react';

// Full-screen CRT tube rendered in WebGL: barrel distortion, phosphor noise,
// interference bands, a rolling refresh bar, horizontal sync tears, and a
// "magnet" around the cursor that bends the picture and splits the colour
// channels. A `crt:degauss` window event triggers the classic degauss wobble.

const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`;

const FRAG = `
precision mediump float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_magnet;
uniform float u_degauss;
uniform float u_scroll;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
}
float fbm(vec2 p){ float v = 0.0, a = 0.5; for (int i = 0; i < 4; i++){ v += a * noise(p); p *= 2.03; a *= 0.5; } return v; }

float signal(vec2 uv){
  float t = u_time;
  float aspect = u_res.x / u_res.y;
  vec2 q = vec2(uv.x * aspect, uv.y + u_scroll * 0.08);
  // slow phosphor clouds
  float clouds = fbm(q * 2.2 + vec2(t * 0.03, -t * 0.02));
  // interference bands drifting through the tube
  float bands = 0.5 + 0.5 * sin(q.y * 22.0 - t * 0.9 + sin(q.x * 2.5 + t * 0.4) * 1.6);
  bands = pow(bands, 6.0);
  // faint graticule
  vec2 g = abs(fract(q * 9.0) - 0.5);
  float grid = smoothstep(0.485, 0.5, max(g.x, g.y)) * 0.35;
  // rolling refresh bar
  float roll = smoothstep(0.0, 0.08, fract(uv.y * 0.6 - t * 0.06)) * smoothstep(0.2, 0.08, fract(uv.y * 0.6 - t * 0.06));
  // static
  float grain = hash(uv * u_res + fract(t * 13.0)) * 0.22;
  return clouds * 0.55 + bands * 0.35 + grid + roll * 0.35 + grain;
}

void main(){
  vec2 uv = gl_FragCoord.xy / u_res;
  // barrel distortion of the tube
  vec2 c = uv * 2.0 - 1.0;
  c *= 1.0 + 0.06 * dot(c, c);
  // degauss wobble
  c += u_degauss * 0.035 * vec2(sin(c.y * 9.0 + u_time * 24.0), cos(c.x * 7.0 + u_time * 21.0));
  uv = c * 0.5 + 0.5;

  // horizontal sync tear in a thin travelling band
  float tearBand = smoothstep(0.03, 0.0, abs(uv.y - fract(u_time * 0.045 + 0.3)));
  uv.x += tearBand * (hash(vec2(floor(uv.y * 90.0), floor(u_time * 8.0))) - 0.5) * 0.06;

  // magnet: pull the picture towards the cursor and split RGB near it
  vec2 m = u_mouse;
  vec2 d = uv - m;
  float aspect = u_res.x / u_res.y;
  float dist = length(vec2(d.x * aspect, d.y));
  float pull = u_magnet * exp(-dist * 7.0);
  vec2 dir = normalize(d + 1e-5);
  float split = 0.004 + pull * 0.03 + u_degauss * 0.02;
  vec2 base = uv - dir * pull * 0.05;

  float r = signal(base + dir * split);
  float gch = signal(base);
  float b = signal(base - dir * split);

  vec3 amber = vec3(1.0, 0.64, 0.24);
  vec3 col = vec3(r * amber.r, gch * amber.g, b * amber.b * 1.35);
  // degauss rainbow
  col += u_degauss * 0.35 * vec3(0.5 + 0.5 * sin(uv.y * 30.0 + u_time * 10.0), 0.5 + 0.5 * sin(uv.y * 30.0 + u_time * 10.0 + 2.1), 0.5 + 0.5 * sin(uv.y * 30.0 + u_time * 10.0 + 4.2));
  // magnet tint
  col += pull * vec3(0.25, 0.05, 0.35);

  // vignette + tube edge
  float vig = smoothstep(1.25, 0.35, length(c));
  float inside = step(0.0, uv.x) * step(uv.x, 1.0) * step(0.0, uv.y) * step(uv.y, 1.0);
  col *= vig * inside * 0.32;
  gl_FragColor = vec4(col, 1.0);
}`;

export default function CrtBackground() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const gl = canvas?.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' });
    if (!gl) return;

    const compile = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
    };
    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'p');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const U = (n) => gl.getUniformLocation(prog, n);
    const uRes = U('u_res'), uTime = U('u_time'), uMouse = U('u_mouse'), uMag = U('u_magnet'), uDeg = U('u_degauss'), uScroll = U('u_scroll');

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const SCALE = 0.5; // render at half resolution; the tube is soft anyway
    const resize = () => {
      canvas.width = Math.max(1, Math.floor(window.innerWidth * SCALE));
      canvas.height = Math.max(1, Math.floor(window.innerHeight * SCALE));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();

    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5, mag: 0, tmag: 0 };
    let degauss = 0;
    const onMove = (e) => { mouse.tx = e.clientX / window.innerWidth; mouse.ty = 1 - e.clientY / window.innerHeight; mouse.tmag = 1; };
    const onLeave = () => { mouse.tmag = 0; };
    const onDegauss = () => { degauss = 1; if (reduced) draw(performance.now()); };
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    window.addEventListener('resize', resize);
    window.addEventListener('crt:degauss', onDegauss);

    const start = performance.now();
    let raf = 0, last = 0;
    function draw(now) {
      const t = reduced ? 12.0 : (now - start) / 1000;
      mouse.x += (mouse.tx - mouse.x) * 0.12;
      mouse.y += (mouse.ty - mouse.y) * 0.12;
      mouse.mag += (mouse.tmag - mouse.mag) * 0.05;
      degauss *= 0.965;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, t);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform1f(uMag, mouse.mag);
      gl.uniform1f(uDeg, degauss < 0.01 ? 0 : degauss);
      gl.uniform1f(uScroll, window.scrollY / window.innerHeight);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
    const loop = (now) => {
      raf = requestAnimationFrame(loop);
      if (document.hidden || now - last < 33) return; // ~30fps cap
      last = now;
      draw(now);
    };
    if (reduced) {
      draw(performance.now());
      const redraw = () => draw(performance.now());
      window.addEventListener('pointermove', redraw, { passive: true });
      return () => { window.removeEventListener('pointermove', redraw); window.removeEventListener('pointermove', onMove); document.removeEventListener('pointerleave', onLeave); window.removeEventListener('resize', resize); window.removeEventListener('crt:degauss', onDegauss); };
    }
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('resize', resize);
      window.removeEventListener('crt:degauss', onDegauss);
    };
  }, []);

  return <canvas ref={ref} className="crt-canvas" aria-hidden="true" />;
}
