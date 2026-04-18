import { useNavigate } from 'react-router-dom'
import { useSaved } from '../hooks/useSaved'

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

export default function SpotCard({ spot }) {
  const navigate = useNavigate()
  const { isSaved, toggleSaved } = useSaved()
  const saved = isSaved(spot.id)

  return (
    <div style={{ backgroundColor: '#fff', borderRadius: '16px', marginBottom: '12px', boxShadow: '0 1px 8px rgba(0,0,0,0.07)', overflow: 'hidden' }}>

      {/* Gradient photo placeholder */}
      <div
        onClick={() => navigate(`/spot/${spot.id}`)}
        style={{ height: '100px', background: moodGradient(spot.moods), display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
      >
        <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '80px', color: 'rgba(0,0,0,0.15)', lineHeight: 1, userSelect: 'none' }}>
          {spot.name[0]}
        </span>
      </div>

      {/* Content */}
      <div style={{ padding: '14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
          <p
            onClick={() => navigate(`/spot/${spot.id}`)}
            style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: '17px', color: '#1a1a1a', margin: 0, flex: 1, cursor: 'pointer' }}
          >
            {spot.name}
          </p>
          <button
            onClick={(e) => { e.stopPropagation(); toggleSaved(spot.id) }}
            aria-label={saved ? 'Unsave' : 'Save'}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px 0 2px 10px', flexShrink: 0 }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill={saved ? '#006577' : 'none'} stroke={saved ? '#006577' : '#c5c5c5'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z" />
            </svg>
          </button>
        </div>

        <div
          onClick={() => navigate(`/spot/${spot.id}`)}
          style={{ cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', gap: '6px', fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#6b6b6b', marginBottom: '10px', flexWrap: 'wrap' }}>
            <span>{spot.area}</span>
            <span>·</span>
            <span>★ {spot.rating}</span>
            <span>·</span>
            <span>{spot.price}</span>
          </div>
          <p style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: '13px', color: '#6b6b6b', borderLeft: '3px solid #006577', paddingLeft: '10px', margin: '0 0 10px', lineHeight: 1.6 }}>
            {spot.tagline}
          </p>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#1a1a1a', margin: 0 }}>
            <span style={{ color: '#6b6b6b' }}>Must Try: </span>{spot.mustTry}
          </p>
        </div>
      </div>
    </div>
  )
}
