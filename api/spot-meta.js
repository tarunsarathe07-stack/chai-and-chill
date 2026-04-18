import { spots } from '../src/data/spots.js'

// Escape HTML entities to prevent broken tags / XSS in generated markup
function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

export default function handler(req, res) {
  const id = parseInt(req.query.id)
  if (!id) return res.status(400).end()

  const spot = spots.find(s => s.id === id)
  if (!spot) return res.status(404).end()

  const title   = esc(`${spot.name} — Chai & Chill`)
  const desc    = esc(spot.tagline)
  const url     = `https://chaichill.in/spot/${spot.id}`
  const image   = 'https://chaichill.in/og-image.jpg'

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${title}</title>

  <!-- OpenGraph -->
  <meta property="og:type"        content="website" />
  <meta property="og:url"         content="${url}" />
  <meta property="og:title"       content="${title}" />
  <meta property="og:description" content="${desc}" />
  <meta property="og:image"       content="${image}" />
  <meta property="og:image:width"  content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:locale"      content="en_IN" />
  <meta property="og:site_name"   content="Chai &amp; Chill" />

  <!-- Twitter/X -->
  <meta name="twitter:card"        content="summary_large_image" />
  <meta name="twitter:title"       content="${title}" />
  <meta name="twitter:description" content="${desc}" />
  <meta name="twitter:image"       content="${image}" />

  <!-- Redirect to the React app immediately after crawlers have read the tags -->
  <meta http-equiv="refresh" content="0;url=${url}" />
</head>
<body>Redirecting to ${esc(spot.name)}…</body>
</html>`

  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  // Let CDN / WhatsApp cache this for 1 hour
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600')
  res.status(200).send(html)
}
