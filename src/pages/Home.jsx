import { useNavigate } from 'react-router-dom'
import { spots } from '../data/spots'
import BottomNav from '../components/BottomNav'

// ── Mood config ──────────────────────────────────────────────────────────────
const MOODS = [
  {
    key: 'date',
    label: 'Date Night',
    bg: '#fff0f0',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#b52619" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
  },
  {
    key: 'solo',
    label: 'Solo Chill',
    bg: '#f0f5ff',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#006577" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 010 8h-1" />
        <path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    ),
  },
  {
    key: 'budget',
    label: 'Budget Friendly',
    bg: '#fffbf0',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#b07d00" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
      </svg>
    ),
  },
  {
    key: 'friends',
    label: 'Squad Hangout',
    bg: '#f0fff5',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#006577" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    key: 'instagram',
    label: 'Instagram Worthy',
    bg: '#fdf0ff',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7e22ce" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    key: 'work',
    label: 'Get Work Done',
    bg: '#f0fbff',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#006577" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
]

function countMood(key) {
  return spots.filter((s) => s.moods.includes(key)).length
}

const getDailyPick = () => {
  const today = new Date()
  const seed = today.getFullYear() * 10000 +
               (today.getMonth() + 1) * 100 +
               today.getDate()
  return spots[seed % spots.length]
}

const dailyPick = getDailyPick()

const AREAS = ['Arera Colony', 'MP Nagar', 'Old Bhopal', 'Shyamla Hills', 'Kerwa Dam']

// ── Component ────────────────────────────────────────────────────────────────
export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen pb-24" style={{ backgroundColor: '#fff8f0' }}>

      {/* ── Top Bar ── */}
      <div className="flex items-center px-5 pt-10 pb-4">
        <h1 style={{ fontFamily: 'Playfair Display, serif', color: '#006577', fontSize: '24px', fontWeight: 700, margin: 0 }}>
          Chai &amp; Chill
        </h1>
      </div>

      {/* ── Hero Card ── */}
      <div className="mx-4 mb-7 rounded-[20px] p-6" style={{ backgroundColor: '#006577' }}>
        <p style={{ fontFamily: 'DM Sans, sans-serif', color: '#fff8f0', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px', opacity: 0.85 }}>
          Bhopal · 57 spots curated
        </p>
        <p style={{ fontFamily: 'Playfair Display, serif', color: '#fff8f0', fontSize: '32px', fontStyle: 'italic', lineHeight: 1.2, marginBottom: '6px' }}>
          Kya mood hai,<br />bawa?
        </p>
        <p style={{ fontFamily: 'DM Sans, sans-serif', color: 'rgba(255,255,255,0.7)', fontSize: '13px', marginBottom: '20px' }}>
          Bhopal ke best spots. Ek Bhopali ki nazar se.
        </p>
        <button
          onClick={() => navigate('/results/best')}
          style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 500, fontSize: '13px', backgroundColor: '#b52619', color: '#fff', border: 'none', borderRadius: '100px', padding: '10px 22px', cursor: 'pointer' }}
        >
          Show me the best
        </button>
      </div>

      {/* ── Explore by Mood ── */}
      <div className="px-4 mb-7">
        <div className="flex items-baseline justify-between mb-4">
          <h2 style={{ fontFamily: 'Playfair Display, serif', color: '#1a1a1a', fontSize: '20px', fontWeight: 600, margin: 0 }}>
            Explore by Mood
          </h2>
          <span style={{ fontFamily: 'DM Sans, sans-serif', fontStyle: 'italic', fontSize: '12px', color: '#006577' }}>
            What are you feeling?
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          {MOODS.map((mood) => (
            <button
              key={mood.key}
              onClick={() => navigate(`/results/${mood.key}`)}
              style={{ backgroundColor: mood.bg, borderRadius: '16px', padding: '16px 14px', border: 'none', boxShadow: '0 1px 6px rgba(0,0,0,0.07)', textAlign: 'left', cursor: 'pointer' }}
            >
              <div style={{ marginBottom: '10px' }}>{mood.icon}</div>
              <p style={{ fontFamily: 'Playfair Display, serif', fontWeight: 600, fontSize: '14px', color: '#1a1a1a', margin: '0 0 2px' }}>
                {mood.label}
              </p>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', color: '#6b6b6b', margin: 0 }}>
                {countMood(mood.key)} spots
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* ── Popular Areas ── */}
      <div className="mb-7">
        <h2 className="px-4" style={{ fontFamily: 'Playfair Display, serif', color: '#1a1a1a', fontSize: '20px', fontWeight: 600, margin: '0 0 12px' }}>
          Popular Areas
        </h2>
        <div className="flex gap-2 px-4 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
          {AREAS.map((area) => (
            <button
              key={area}
              onClick={() => navigate(`/explore?area=${encodeURIComponent(area)}`)}
              style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#006577', border: '1.5px solid #006577', borderRadius: '8px', padding: '8px 16px', backgroundColor: 'transparent', whiteSpace: 'nowrap', cursor: 'pointer', flexShrink: 0 }}
            >
              {area}
            </button>
          ))}
        </div>
      </div>

      {/* ── Today's Pick ── */}
      <div className="px-4 mb-7">
        <h2 style={{ fontFamily: 'Playfair Display, serif', color: '#1a1a1a', fontSize: '20px', fontWeight: 600, margin: '0 0 12px' }}>
          Today's Pick
        </h2>
        <div
          onClick={() => navigate(`/spot/${dailyPick.id}`)}
          style={{ backgroundColor: '#fff', borderRadius: '20px', boxShadow: '0 2px 16px rgba(0,0,0,0.08)', overflow: 'hidden', cursor: 'pointer' }}
        >
          <div style={{ height: '200px', backgroundColor: '#e8f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '28px', color: '#006577', opacity: 0.35, fontStyle: 'italic' }}>
              {dailyPick.name}
            </span>
          </div>
          <div style={{ padding: '16px' }}>
            <p style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: '22px', color: '#1a1a1a', margin: '0 0 6px' }}>
              {dailyPick.name}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#6b6b6b', marginBottom: '12px' }}>
              <span>{dailyPick.area}</span>
              <span>·</span>
              <span>★ {dailyPick.rating}</span>
              <span>·</span>
              <span>{dailyPick.price}</span>
            </div>
            <p style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: '14px', color: '#6b6b6b', borderLeft: '3px solid #006577', paddingLeft: '12px', margin: 0, lineHeight: 1.6 }}>
              {dailyPick.tagline}
            </p>
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="px-6 pb-10 text-center">
        <p style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: '16px', color: '#1a1a1a', lineHeight: 1.7, margin: '0 0 12px' }}>
          No ads. No sponsored listings.<br />
          Bhopal ke best spots sirf<br />
          Bhopalion ko pata hone chahiye.
        </p>
        <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#6b6b6b', margin: 0 }}>
          Curated by Tarun <span style={{ color: '#b52619' }}>♥</span>
        </p>
      </div>

      <BottomNav />
    </div>
  )
}
