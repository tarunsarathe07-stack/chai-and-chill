import { useNavigate } from 'react-router-dom'
import { spots } from '../data/spots'
import { useSaved } from '../hooks/useSaved'
import SpotCard from '../components/SpotCard'
import BottomNav from '../components/BottomNav'

export default function Saved() {
  const navigate = useNavigate()
  const { saved } = useSaved()
  const savedSpots = spots.filter((s) => saved.includes(s.id))

  return (
    <div className="min-h-screen pb-24" style={{ backgroundColor: '#fff8f0' }}>
      <div className="px-4 pt-10 pb-4">
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '22px', fontWeight: 700, color: '#1a1a1a', margin: 0 }}>
          Saved
        </h1>
      </div>

      {savedSpots.length === 0 ? (
        <div className="px-4 flex flex-col items-center text-center" style={{ paddingTop: '48px' }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#c5c5c5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '16px' }}>
            <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z" />
          </svg>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px', color: '#1a1a1a', margin: '0 0 8px', fontWeight: 600 }}>
            Abhi kuch saved nakko hai
          </h2>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#6b6b6b', margin: '0 0 28px', lineHeight: 1.6 }}>
            Spots dekho, jo pasand aaye wo save karo bawa.
          </p>
          <button
            onClick={() => navigate('/explore')}
            style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 500, fontSize: '14px', backgroundColor: '#006577', color: '#fff', border: 'none', borderRadius: '100px', padding: '12px 32px', cursor: 'pointer' }}
          >
            Explore spots
          </button>
        </div>
      ) : (
        <div className="px-4">
          {savedSpots.map((spot) => <SpotCard key={spot.id} spot={spot} />)}
        </div>
      )}

      <BottomNav />
    </div>
  )
}
