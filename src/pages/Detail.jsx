import { useParams, useNavigate } from 'react-router-dom'
import { spots } from '../data/spots'
import { useSaved } from '../hooks/useSaved'
import BottomNav from '../components/BottomNav'

const MOOD_GRADIENTS = {
  date:       ['#f8e8e8', '#e8d0d0'],
  solo:       ['#e8eef8', '#d0ddf0'],
  budget:     ['#f8f4e8', '#f0e8d0'],
  friends:    ['#e8f4e8', '#d0ead0'],
  instagram:  ['#f4e8f8', '#e8d0f0'],
  work:       ['#e8f8f8', '#d0ecec'],
  legendary:  ['#f8f0e8', '#f0e0cc'],
  nature:     ['#eaf4e8', '#d4ebd0'],
  premium:    ['#f0ece8', '#e4d8cc'],
  late_night: ['#e8e8f4', '#d0d0ec'],
  rooftop:    ['#f4f0e8', '#ece0cc'],
  scenic:     ['#e8f0f8', '#cce0f0'],
  default:    ['#f0ece8', '#e4d8cc'],
}

function moodGradient(moods) {
  const key = (moods && moods[0]) || 'default'
  const [a, b] = MOOD_GRADIENTS[key] ?? MOOD_GRADIENTS.default
  return `linear-gradient(135deg, ${a}, ${b})`
}

export default function Detail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isSaved, toggleSaved } = useSaved()
  const spot = spots.find((s) => s.id === Number(id))
  const saved = spot ? isSaved(spot.id) : false

  if (!spot) {
    return (
      <div className="px-4 pt-10 min-h-screen" style={{ backgroundColor: '#fff8f0' }}>
        <button onClick={() => navigate(-1)} style={{ color: '#006577', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '16px' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <p style={{ fontFamily: 'DM Sans, sans-serif', color: '#6b6b6b' }}>Ye spot nakko mila bawa.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-24" style={{ backgroundColor: '#fff8f0' }}>

      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-10 pb-4">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={() => navigate(-1)}
            aria-label="Go back"
            style={{ color: '#006577', background: 'none', border: 'none', cursor: 'pointer', padding: '4px', flexShrink: 0 }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#6b6b6b' }}>{spot.area}</span>
        </div>
        <button
          onClick={() => toggleSaved(spot.id)}
          aria-label={saved ? 'Unsave' : 'Save'}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill={saved ? '#006577' : 'none'} stroke={saved ? '#006577' : '#6b6b6b'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z" />
          </svg>
        </button>
      </div>

      {/* Gradient photo placeholder */}
      <div style={{ height: '240px', background: moodGradient(spot.moods), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '80px', color: 'rgba(0,0,0,0.15)', lineHeight: 1, userSelect: 'none' }}>
          {spot.name[0]}
        </span>
      </div>

      {/* Content */}
      <div className="px-4 pt-5">
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: '26px', color: '#1a1a1a', margin: '0 0 6px' }}>
          {spot.name}
        </h1>

        <div style={{ display: 'flex', gap: '8px', fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#6b6b6b', marginBottom: '16px', flexWrap: 'wrap' }}>
          <span>★ {spot.rating}</span>
          <span>·</span>
          <span>{spot.reviews} reviews</span>
          <span>·</span>
          <span>{spot.price}</span>
          <span>·</span>
          <span>{spot.hours}</span>
        </div>

        <p style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: '15px', color: '#6b6b6b', borderLeft: '3px solid #006577', paddingLeft: '14px', margin: '0 0 20px', lineHeight: 1.7 }}>
          {spot.tagline}
        </p>

        <div style={{ backgroundColor: '#fff', borderRadius: '14px', padding: '14px 16px', marginBottom: '10px' }}>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '10px', color: '#6b6b6b', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 4px' }}>Must Try</p>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#1a1a1a', margin: 0 }}>{spot.mustTry}</p>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: '14px', padding: '14px 16px', marginBottom: '20px' }}>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '10px', color: '#6b6b6b', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 4px' }}>Hours</p>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#1a1a1a', margin: 0 }}>{spot.hours}</p>
        </div>

        <a
          href={`https://www.google.com/maps/search/?api=1&query=${spot.lat},${spot.lng}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%', padding: '14px', backgroundColor: '#006577', color: '#fff', borderRadius: '14px', fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: 500, textDecoration: 'none', boxSizing: 'border-box' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2C8.686 2 6 4.686 6 8c0 4.5 6 13 6 13s6-8.5 6-13c0-3.314-2.686-6-6-6z" />
            <circle cx="12" cy="8" r="2" />
          </svg>
          Open in Google Maps
        </a>
      </div>

      <BottomNav />
    </div>
  )
}
