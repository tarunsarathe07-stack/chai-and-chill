import { useParams, useNavigate } from 'react-router-dom'
import { spots } from '../data/spots'
import SpotCard from '../components/SpotCard'
import BottomNav from '../components/BottomNav'

const MOOD_LABELS = {
  date: 'Date Night',
  solo: 'Solo Chill',
  budget: 'Budget Friendly',
  friends: 'Squad Hangout',
  instagram: 'Instagram Worthy',
  work: 'Get Work Done',
  best: 'Bhopal ke best spots',
  all: 'All Spots',
}

export default function Results() {
  const { mood } = useParams()
  const navigate = useNavigate()

  let filtered
  if (mood === 'best') {
    filtered = spots
      .filter((s) => s.rating >= 4.4)
      .sort((a, b) => b.rating - a.rating)
  } else if (mood === 'all') {
    filtered = [...spots].sort((a, b) => b.rating - a.rating)
  } else {
    filtered = spots
      .filter((s) => s.moods.includes(mood))
      .sort((a, b) => b.rating - a.rating)
  }

  const label = MOOD_LABELS[mood] ?? mood

  return (
    <div className="min-h-screen pb-24" style={{ backgroundColor: '#fff8f0' }}>

      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-10 pb-2">
        <button
          onClick={() => navigate(-1)}
          aria-label="Go back"
          style={{ color: '#006577', background: 'none', border: 'none', cursor: 'pointer', padding: '4px', flexShrink: 0 }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '22px', fontWeight: 700, color: '#1a1a1a', margin: 0 }}>
            {label}
          </h1>
          {mood === 'best' && (
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#006577', margin: '2px 0 0', fontStyle: 'italic' }}>
              Rating 4.4 aur upar — sirf bhannat jagahein
            </p>
          )}
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#6b6b6b', margin: '2px 0 0' }}>
            {filtered.length} spots curated
          </p>
        </div>
      </div>

      {/* List */}
      <div className="px-4 pt-3">
        {filtered.length === 0 ? (
          <p style={{ fontFamily: 'DM Sans, sans-serif', color: '#6b6b6b', textAlign: 'center', paddingTop: '40px' }}>
            Koi spot nakko mila bawa.
          </p>
        ) : (
          filtered.map((spot) => <SpotCard key={spot.id} spot={spot} />)
        )}
      </div>

      <BottomNav />
    </div>
  )
}
