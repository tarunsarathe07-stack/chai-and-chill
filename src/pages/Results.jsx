import { useState } from 'react'
import { C, FONTS, Icon, SpotImage, Rating, Tagline, Chip, Tap, Reveal, Enter, BookmarkBtn } from '../ui/primitives.jsx'
import { SPOTS, MOODS } from '../data/adapted.js'

const MOOD_EMOJI = { date: '💕', solo: '☕', budget: '💸', squad: '👯', insta: '📸', work: '💻' }

function SpotCard({ spot, onOpen, saved, toggleSave }) {
  return (
    <Tap onClick={onOpen} style={{ background: '#fff', borderRadius: 20, overflow: 'hidden', boxShadow: C.shadowWarm }}>
      <div style={{ padding: 10, position: 'relative' }}>
        <SpotImage spot={spot} moods={MOODS} height={160} rounded={14} />
        <div style={{ position: 'absolute', top: 18, right: 18 }}>
          <BookmarkBtn saved={saved} onToggle={toggleSave} />
        </div>
      </div>
      <div style={{ padding: '6px 16px 16px' }}>
        <div style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 22, color: C.text, letterSpacing: -0.3 }}>
          {spot.name}
        </div>
        <div style={{ fontFamily: FONTS.body, fontSize: 12, color: C.muted, marginTop: 3, display: 'flex', gap: 8, alignItems: 'center' }}>
          <span>{spot.area}</span><span>·</span>
          <Rating value={spot.rating} /><span>·</span><span>{spot.price}</span>
        </div>
        <div style={{ marginTop: 10 }}>
          <Tagline>{spot.tagline}</Tagline>
        </div>
        <div style={{ marginTop: 14, display: 'flex', gap: 6, overflowX: 'auto', scrollbarWidth: 'none' }}>
          <div style={{
            fontFamily: FONTS.body, fontSize: 10, fontWeight: 600,
            color: '#8b6a1a', letterSpacing: 1, textTransform: 'uppercase',
            display: 'flex', alignItems: 'center', flexShrink: 0,
          }}>Must try</div>
          {spot.mustTry.map(m => (
            <div key={m} style={{
              background: 'rgba(196,154,42,0.14)', color: '#8b6a1a',
              fontFamily: FONTS.body, fontSize: 12, fontWeight: 500,
              padding: '5px 10px', borderRadius: 100, whiteSpace: 'nowrap',
            }}>{m}</div>
          ))}
        </div>
        <div style={{ marginTop: 10, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {spot.tags.slice(0, 3).map(t => (
            <div key={t} style={{
              fontFamily: FONTS.body, fontSize: 11, fontWeight: 500,
              color: C.primary, background: 'rgba(0,101,119,0.08)',
              padding: '4px 10px', borderRadius: 100,
            }}>{t}</div>
          ))}
        </div>
      </div>
    </Tap>
  )
}

export default function Results({ moodId, onBack, onOpenSpot, savedIds, toggleSave }) {
  const mood = MOODS.find(m => m.id === moodId) || MOODS[0]
  const [filter, setFilter] = useState('All')
  const filters = ['All', 'Rooftop', 'Premium', 'Budget', 'Nature', 'Late Night']
  const emoji = MOOD_EMOJI[moodId] || '✨'

  const moodSpots = SPOTS.filter(s => s.tags.includes(moodId))
  const results = filter === 'All'
    ? moodSpots
    : moodSpots.filter(s => s.tags.includes(filter.toLowerCase().replace(' ', '_')))

  return (
    <div data-scroll-root style={{ background: C.bg, height: '100%', overflowY: 'auto', overflowX: 'hidden', paddingBottom: 110 }}>
      <div style={{ padding: '62px 20px 6px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <Tap onClick={onBack} scale={0.9} style={{
          width: 38, height: 38, borderRadius: 100, background: C.surface,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name="arrowLeft" size={18} color={C.primary} />
        </Tap>
      </div>
      <div style={{ padding: '4px 20px 0' }}>
        <Enter delay={0} keyId={`mood-h-${moodId}`}>
          <div style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 34, color: C.text, letterSpacing: -0.8, lineHeight: 1.05 }}>
            {emoji} {mood.name}
          </div>
        </Enter>
        <Enter delay={100} keyId={`mood-s-${moodId}`}>
          <div style={{ fontFamily: FONTS.body, fontSize: 14, color: C.muted, marginTop: 6 }}>
            {moodSpots.length} spots picked for you, bawa
          </div>
        </Enter>
      </div>

      <Enter delay={180} keyId={`mood-f-${moodId}`}>
        <div style={{ display: 'flex', gap: 8, padding: '20px 20px 4px', overflowX: 'auto', scrollbarWidth: 'none' }}>
          {filters.map(f => (
            <Chip key={f} active={filter === f} onClick={() => setFilter(f)}>{f}</Chip>
          ))}
        </div>
      </Enter>

      <div style={{ padding: '14px 20px 0', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {results.length === 0 && (
          <div style={{ background: C.surface, borderRadius: 16, padding: 20, textAlign: 'center', fontFamily: FONTS.display, fontStyle: 'italic', color: C.muted }}>
            Koi spot nakko mila, bawa.
          </div>
        )}
        {results.map((s, i) => (
          <Reveal key={s.id} delay={i * 40}>
            <SpotCard spot={s} onOpen={() => onOpenSpot(s)}
              saved={savedIds.includes(s.id)} toggleSave={() => toggleSave(s.id)} />
          </Reveal>
        ))}
      </div>
    </div>
  )
}
