import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { spots } from '../data/spots'
import SpotCard from '../components/SpotCard'
import BottomNav from '../components/BottomNav'

const MOOD_CHIPS = [
  { label: 'All',              key: 'all' },
  { label: 'Date Night',       key: 'date' },
  { label: 'Solo Chill',       key: 'solo' },
  { label: 'Squad Hangout',    key: 'friends' },
  { label: 'Budget Friendly',  key: 'budget' },
  { label: 'Instagram Worthy', key: 'instagram' },
  { label: 'Get Work Done',    key: 'work' },
  { label: 'Late Night',       key: 'late_night' },
  { label: 'Nature',           key: 'nature' },
  { label: 'Premium',          key: 'premium' },
  { label: 'Rooftop',          key: 'rooftop' },
  { label: 'Legendary',        key: 'legendary' },
]

const BUDGET_CHIPS = [
  { label: 'All',       key: 'all' },
  { label: 'Budget',    key: 'budget' },
  { label: 'Mid-range', key: 'mid' },
  { label: 'Premium',   key: 'premium' },
]

const chipBase = {
  fontFamily: 'DM Sans, sans-serif',
  fontSize: '13px',
  borderRadius: '100px',
  padding: '7px 16px',
  border: '1.5px solid #e0d8d0',
  whiteSpace: 'nowrap',
  cursor: 'pointer',
  flexShrink: 0,
  transition: 'all 0.15s',
}

function Chip({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        ...chipBase,
        backgroundColor: active ? '#006577' : '#fff',
        color: active ? '#fff' : '#1a1a1a',
        borderColor: active ? '#006577' : '#e0d8d0',
        fontWeight: active ? 500 : 400,
      }}
    >
      {label}
    </button>
  )
}

export default function Explore() {
  const [searchParams] = useSearchParams()
  const areaFilter = searchParams.get('area') || ''

  const [searchQuery, setSearchQuery] = useState(areaFilter)
  const [activeMood, setActiveMood] = useState('all')
  const [activeBudget, setActiveBudget] = useState('all')

  const filtered = spots.filter((spot) => {
    const matchesSearch =
      !searchQuery ||
      spot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      spot.area.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesMood =
      !activeMood || activeMood === 'all' || spot.moods.includes(activeMood)
    const matchesBudget =
      !activeBudget || activeBudget === 'all' || spot.budget === activeBudget
    return matchesSearch && matchesMood && matchesBudget
  }).sort((a, b) => b.rating - a.rating)

  return (
    <div className="min-h-screen pb-24" style={{ backgroundColor: '#fff8f0' }}>

      {/* ── Header ── */}
      <div className="flex items-baseline justify-between px-4 pt-10 pb-4">
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '22px', fontWeight: 700, color: '#1a1a1a', margin: 0 }}>
          Explore
        </h1>
        <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#6b6b6b' }}>
          {spots.length} spots
        </span>
      </div>

      {/* ── Search bar ── */}
      <div className="px-4 mb-4">
        <div style={{ position: 'relative' }}>
          <svg
            width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="#6b6b6b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
          >
            <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search cafes, areas..."
            style={{
              width: '100%',
              backgroundColor: '#fff',
              border: '1.5px solid #e0d8d0',
              borderRadius: '12px',
              padding: '12px 16px 12px 38px',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '14px',
              color: '#1a1a1a',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#6b6b6b', padding: '4px' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* ── Mood filter chips ── */}
      <div className="mb-3">
        <div className="flex gap-2 px-4 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
          {MOOD_CHIPS.map((chip) => (
            <Chip
              key={chip.key}
              label={chip.label}
              active={activeMood === chip.key}
              onClick={() => setActiveMood(chip.key)}
            />
          ))}
        </div>
      </div>

      {/* ── Budget filter row ── */}
      <div className="mb-4">
        <div className="flex gap-2 px-4 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
          {BUDGET_CHIPS.map((chip) => (
            <Chip
              key={chip.key}
              label={chip.label}
              active={activeBudget === chip.key}
              onClick={() => setActiveBudget(chip.key)}
            />
          ))}
        </div>
      </div>

      {/* ── Results count ── */}
      <div className="px-4 mb-3">
        <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#6b6b6b', margin: 0 }}>
          Showing {filtered.length} spots
        </p>
      </div>

      {/* ── Spot list ── */}
      <div className="px-4">
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', paddingTop: '40px' }}>
            <p style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: '16px', color: '#1a1a1a', margin: '0 0 6px' }}>
              Koi spot nakko mila bawa.
            </p>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#6b6b6b', margin: 0 }}>
              Try karo dusra filter.
            </p>
          </div>
        ) : (
          filtered.map((spot) => <SpotCard key={spot.id} spot={spot} />)
        )}
      </div>

      <BottomNav />
    </div>
  )
}
