import { useState } from 'react'
import { C, FONTS, Icon, SpotImage, Rating, Chip, Tap, Reveal, BookmarkBtn } from '../ui/primitives.jsx'
import { SPOTS, MOODS } from '../data/adapted.js'

function SectionHeader({ children, sub }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 3, height: 18, background: C.primary, borderRadius: 2, flexShrink: 0 }} />
        <div style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 18, color: C.text, letterSpacing: -0.2 }}>{children}</div>
      </div>
      {sub && <div style={{ fontFamily: FONTS.body, fontSize: 12, color: C.muted, marginTop: 2, marginLeft: 13 }}>{sub}</div>}
    </div>
  )
}

function CompactCard({ spot, onOpen, saved, toggleSave }) {
  const mood = MOODS.find(m => m.id === spot.moodId) || MOODS[0]
  return (
    <Tap onClick={onOpen} scale={0.98} style={{
      background: '#fff', borderRadius: 16, padding: 10,
      display: 'flex', gap: 12, alignItems: 'center',
      boxShadow: '0 2px 10px rgba(0,101,119,0.05)',
    }}>
      <div style={{ width: 72, height: 72, borderRadius: 12, flexShrink: 0, background: mood.grad, position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: FONTS.display, fontWeight: 800, fontSize: 48, color: mood.accent, opacity: 0.75, lineHeight: 1,
        }}>{spot.name[0]}</div>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 16, color: C.text, letterSpacing: -0.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {spot.name}
        </div>
        <div style={{ fontFamily: FONTS.body, fontSize: 11.5, color: C.muted, marginTop: 2, display: 'flex', gap: 6, alignItems: 'center' }}>
          <span>{spot.area}</span><span>·</span>
          <Rating value={spot.rating} size={10} /><span>·</span><span>{spot.price}</span>
        </div>
        <div style={{ marginTop: 6, display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {spot.tags.slice(0, 2).map(t => (
            <span key={t} style={{ fontFamily: FONTS.body, fontSize: 10, fontWeight: 500, color: C.primary, background: 'rgba(0,101,119,0.08)', padding: '2px 7px', borderRadius: 100 }}>{t}</span>
          ))}
        </div>
      </div>
      <div onClick={e => { e.stopPropagation(); toggleSave() }} style={{ padding: 8, display: 'inline-flex', cursor: 'pointer' }}>
        <Icon name={saved ? 'bookmarkFill' : 'bookmark'} size={18} color={saved ? C.primary : C.muted} stroke={2} />
      </div>
    </Tap>
  )
}

const BUDGET_MAP = { '₹': 'budget', '₹₹': 'mid', '₹₹₹': 'premium' }

export default function Explore({ onOpenSpot, savedIds, toggleSave }) {
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)
  const [moodFilter, setMoodFilter] = useState('all')
  const [budgetFilter, setBudgetFilter] = useState('all')

  const budgets = [
    { id: 'all', label: 'All' },
    { id: '₹', label: '₹ Budget' },
    { id: '₹₹', label: '₹₹ Mid' },
    { id: '₹₹₹', label: '₹₹₹ Premium' },
  ]

  const legends = SPOTS.filter(s => s.legend)

  let results = SPOTS
  if (moodFilter !== 'all') results = results.filter(s => s.tags.includes(moodFilter))
  if (budgetFilter !== 'all') results = results.filter(s => s.budget === BUDGET_MAP[budgetFilter])
  if (query) results = results.filter(s =>
    s.name.toLowerCase().includes(query.toLowerCase()) ||
    s.area.toLowerCase().includes(query.toLowerCase()) ||
    s.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
  )

  return (
    <div data-scroll-root style={{ background: C.bg, height: '100%', overflowY: 'auto', overflowX: 'hidden', paddingBottom: 110 }}>
      <div style={{ padding: '62px 20px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 32, color: C.text, letterSpacing: -0.6 }}>Explore</div>
          <div style={{ fontFamily: FONTS.body, fontSize: 12, color: C.muted }}>{SPOTS.length} spots</div>
        </div>

        {/* Search */}
        <div style={{
          marginTop: 16, display: 'flex', alignItems: 'center', gap: 10,
          background: '#fff',
          border: `1.5px solid ${focused ? C.primary : C.border}`,
          borderRadius: 100, padding: '12px 16px',
          boxShadow: focused
            ? '0 0 0 4px rgba(0,101,119,0.1), 0 2px 8px rgba(0,101,119,0.08)'
            : '0 1px 2px rgba(0,101,119,0.04)',
          transition: 'all 260ms cubic-bezier(0.2,0.8,0.2,1)',
        }}>
          <Icon name="search" size={16} color={focused ? C.primary : C.muted} />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Search cafes, areas, vibes…"
            style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontFamily: FONTS.body, fontSize: 14, color: C.text }}
          />
          {query && (
            <button onClick={() => setQuery('')} style={{ all: 'unset', cursor: 'pointer', display: 'inline-flex' }}>
              <Icon name="close" size={14} color={C.muted} />
            </button>
          )}
        </div>
      </div>

      {/* Bhopal Legends */}
      {legends.length > 0 && (
        <>
          <div style={{ padding: '24px 20px 0' }}>
            <SectionHeader sub="The heritage kitchens that raised us.">Bhopal Legends</SectionHeader>
          </div>
          <div style={{ marginTop: 12, display: 'flex', gap: 12, padding: '0 20px 4px', overflowX: 'auto', scrollbarWidth: 'none' }}>
            {legends.map((s, i) => (
              <Reveal key={s.id} delay={i * 60}>
                <Tap onClick={() => onOpenSpot(s)} style={{ minWidth: 150, width: 150, background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: C.shadowWarm }}>
                  <div style={{ padding: 6 }}>
                    <SpotImage spot={s} moods={MOODS} height={110} rounded={12} showSepia />
                  </div>
                  <div style={{ padding: '2px 10px 10px' }}>
                    <div style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 14, color: C.text, lineHeight: 1.2, letterSpacing: -0.2 }}>{s.name}</div>
                    <div style={{ fontFamily: FONTS.body, fontSize: 10.5, color: C.muted, marginTop: 3 }}>{s.area} · Classic</div>
                  </div>
                </Tap>
              </Reveal>
            ))}
          </div>
        </>
      )}

      {/* Mood filter */}
      <div style={{ padding: '24px 20px 0' }}>
        <div style={{ fontFamily: FONTS.body, fontSize: 11, fontWeight: 600, color: C.muted, letterSpacing: 1.2, textTransform: 'uppercase' }}>By Mood</div>
      </div>
      <div style={{ display: 'flex', gap: 8, padding: '10px 20px 4px', overflowX: 'auto', scrollbarWidth: 'none' }}>
        <Chip active={moodFilter === 'all'} onClick={() => setMoodFilter('all')}>All</Chip>
        {MOODS.map(m => (
          <Chip key={m.id} active={moodFilter === m.id} onClick={() => setMoodFilter(m.id)}>{m.name}</Chip>
        ))}
      </div>

      {/* Budget filter */}
      <div style={{ padding: '16px 20px 0' }}>
        <div style={{ fontFamily: FONTS.body, fontSize: 11, fontWeight: 600, color: C.muted, letterSpacing: 1.2, textTransform: 'uppercase' }}>By Budget</div>
      </div>
      <div style={{ display: 'flex', gap: 8, padding: '10px 20px 4px', overflowX: 'auto', scrollbarWidth: 'none' }}>
        {budgets.map(b => (
          <Chip key={b.id} active={budgetFilter === b.id} tone="accent" onClick={() => setBudgetFilter(b.id)}>{b.label}</Chip>
        ))}
      </div>

      {/* Results */}
      <div style={{ padding: '20px 20px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {results.length === 0 && (
          <div style={{ background: C.surface, borderRadius: 16, padding: 20, textAlign: 'center', fontFamily: FONTS.display, fontStyle: 'italic', color: C.muted }}>
            Kuch nahi mila, bawa. Filter thoda loose karo.
          </div>
        )}
        {results.map((s, i) => (
          <Reveal key={s.id} delay={i * 35}>
            <CompactCard spot={s} onOpen={() => onOpenSpot(s)}
              saved={savedIds.includes(s.id)} toggleSave={() => toggleSave(s.id)} />
          </Reveal>
        ))}
      </div>
    </div>
  )
}
