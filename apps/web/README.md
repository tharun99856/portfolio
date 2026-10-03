# Web portfolio app

React/Vite application for the portfolio redesign.

## Development

```bash
npm install
npm run dev
```

## Vercel Web Analytics Setup

This project is configured with Vercel Web Analytics. Here's how to complete the setup:

### ✅ Already Completed:
1. ✅ Vercel CLI installed globally
2. ✅ `@vercel/analytics` package installed
3. ✅ Analytics component added to `src/App.jsx`
4. ✅ Custom Analytics dashboard component created in `src/components/Analytics.jsx`

### 📋 Next Steps:

#### 1. Deploy to Vercel

First, make sure you're logged into Vercel:
```bash
vercel login
```

Then deploy your project:
```bash
vercel --prod
```

Or connect your Git repository for automatic deployments:
- Go to [vercel.com/new](https://vercel.com/new)
- Import your Git repository
- Vercel will auto-detect the settings and deploy

#### 2. Enable Web Analytics in Vercel Dashboard

After deployment:
1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Click **Analytics** in the sidebar
4. Click the **Enable** button

This will add tracking routes (`/_vercel/insights/*`) to your deployment.

#### 3. Verify Analytics Are Working

After enabling analytics and visiting your deployed site:
1. Open browser DevTools (F12)
2. Go to the **Network** tab
3. Visit any page on your site
4. Look for a request to `/_vercel/insights/` or similar path
5. If you see it, analytics are tracking correctly! 🎉

#### 4. View Your Analytics Data

Once users visit your site, view analytics data at:
```
https://vercel.com/[your-username]/[project-name]/analytics
```

### Custom Analytics Component

The custom analytics dashboard at `#analytics` on your portfolio currently shows placeholder data. After your site gets traffic, you can:

- View real metrics in the Vercel dashboard
- Optionally integrate Vercel's Analytics API to display real data in your custom component
- Or keep it as a visual feature with the mock data

### Learn More

- [Vercel Web Analytics Docs](https://vercel.com/docs/analytics)
- [Analytics API](https://vercel.com/docs/rest-api/endpoints#analytics)
- [Privacy & Compliance](https://vercel.com/docs/analytics/privacy-policy)

## Build

```bash
npm run build
```

## Preview

```bash
npm run preview
```
