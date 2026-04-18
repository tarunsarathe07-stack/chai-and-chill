import sharp from 'sharp'
import { writeFileSync } from 'fs'
import { mkdirSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outPath = path.join(__dirname, '..', 'public', 'og-image.jpg')

// 1200×630 SVG — rendered by sharp's librsvg engine
const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <!-- Teal background -->
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%"   stop-color="#006577"/>
      <stop offset="100%" stop-color="#004e5c"/>
    </linearGradient>
    <!-- Subtle dot grid overlay -->
    <pattern id="dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
      <circle cx="14" cy="14" r="1.4" fill="rgba(255,248,240,0.18)"/>
    </pattern>
    <!-- Warm glow top-right -->
    <radialGradient id="glow" cx="85%" cy="15%" r="40%">
      <stop offset="0%"   stop-color="#b52619" stop-opacity="0.28"/>
      <stop offset="100%" stop-color="#b52619" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#dots)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>

  <!-- Left accent bar -->
  <rect x="80" y="160" width="6" height="200" rx="3" fill="#b52619"/>

  <!-- "Chai &amp; Chill" — display serif, large -->
  <text
    x="110" y="260"
    font-family="Georgia, 'Times New Roman', serif"
    font-weight="800"
    font-size="108"
    letter-spacing="-3"
    fill="white"
  >Chai &amp; Chill</text>

  <!-- Tagline -->
  <text
    x="112" y="330"
    font-family="Arial, Helvetica, sans-serif"
    font-weight="400"
    font-size="36"
    fill="rgba(255,248,240,0.82)"
    letter-spacing="0.5"
  >Bhopal ke best spots. Ek Bhopali ki nazar se.</text>

  <!-- Pill badge -->
  <rect x="112" y="368" width="330" height="52" rx="26" fill="rgba(255,248,240,0.14)" stroke="rgba(255,248,240,0.3)" stroke-width="1.5"/>
  <text
    x="277" y="401"
    font-family="Arial, Helvetica, sans-serif"
    font-weight="600"
    font-size="22"
    fill="rgba(255,248,240,0.9)"
    text-anchor="middle"
    letter-spacing="1.5"
  >57 SPOTS · NO ADS</text>

  <!-- Bottom-right URL -->
  <text
    x="1120" y="590"
    font-family="Arial, Helvetica, sans-serif"
    font-weight="500"
    font-size="26"
    fill="rgba(255,248,240,0.55)"
    text-anchor="end"
    letter-spacing="0.5"
  >chaichill.in</text>

  <!-- Decorative chai cup — bottom left watermark -->
  <g transform="translate(820, 80)" opacity="0.12">
    <rect width="320" height="320" rx="60" fill="white"/>
    <!-- cup body -->
    <path d="M60 110 h160 l-24 140 H84 Z" fill="none" stroke="#006577" stroke-width="14" stroke-linejoin="round"/>
    <!-- handle -->
    <path d="M220 140 h28 a28 28 0 0 1 0 56 h-28" fill="none" stroke="#006577" stroke-width="14" stroke-linecap="round"/>
    <!-- steam 1 -->
    <path d="M110 88 q10-22 0-44" fill="none" stroke="#006577" stroke-width="10" stroke-linecap="round"/>
    <!-- steam 2 -->
    <path d="M160 88 q10-22 0-44" fill="none" stroke="#006577" stroke-width="10" stroke-linecap="round"/>
    <!-- steam 3 -->
    <path d="M210 88 q10-22 0-44" fill="none" stroke="#006577" stroke-width="10" stroke-linecap="round"/>
  </g>
</svg>
`.trim()

await sharp(Buffer.from(svg))
  .jpeg({ quality: 92, mozjpeg: true })
  .toFile(outPath)

console.log('✅ og-image.jpg written to public/')
