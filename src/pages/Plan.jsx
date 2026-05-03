import { useMemo, useState } from 'react'
import { C, FONTS, Icon, Tagline, Tap, Reveal, Enter, BookmarkBtn } from '../ui/primitives.jsx'
import { SPOTS } from '../data/adapted.js'

const GROUPS = [
  { id: 'date', label: 'Date', icon: 'heart', tags: ['date'], line: 'Soft lights, good table, no awkward chaos.' },
  { id: 'squad', label: 'Squad', icon: 'users', tags: ['squad', 'friends', 'unique'], line: 'Enough energy for everyone to have an opinion.' },
  { id: 'solo', label: 'Solo', icon: 'coffee', tags: ['solo', 'work', 'study'], line: 'Peace, coffee, and nobody rushing you.' },
]

const BUDGETS = [
  { id: 'all', label: 'Any', icon: 'spark' },
  { id: 'budget', label: 'Budget', icon: 'rupee' },
  { id: 'mid', label: 'Mid', icon: 'coffee' },
  { id: 'premium', label: 'Premium', icon: 'star' },
]

const TIMES = [
  { id: 'evening', label: 'Evening', icon: 'sun', tags: ['date', 'scenic', 'rooftop', 'chill'] },
  { id: 'late', label: 'Late', icon: 'moon', tags: ['late_night', 'friends', 'squad'] },
  { id: 'work', label: 'Work', icon: 'laptop', tags: ['work', 'study', 'solo'] },
  { id: 'breakfast', label: 'Breakfast', icon: 'coffee', tags: ['breakfast', 'legendary', 'budget'] },
]

const AREA_GROUPS = [
  { id: 'all', label: 'Anywhere', icon: 'map' },
  { id: 'arera', label: 'Arera', icon: 'pin', match: ['Arera', '10 No', 'Bawadiya', 'Gulmohar', 'Rohit'] },
  { id: 'lake', label: 'Lake', icon: 'sun', match: ['Shyamla', 'VIP', 'Van Vihar', 'Gohar', 'Lake'] },
  { id: 'old', label: 'Old city', icon: 'compass', match: ['Old Bhopal', 'Hamidia', 'New Market', 'Peer Gate', 'Lakherapura'] },
]

const scoreSpot = (spot, plan, shuffle) => {
  let score = spot.planScore || 0
  const wantedTags = [...plan.group.tags, ...plan.time.tags]
  score += wantedTags.reduce((sum, tag) => sum + (spot.tags.includes(tag) || spot.moods?.includes(tag) ? 16 : 0), 0)
  if (plan.budget.id !== 'all') score += spot.budget === plan.budget.id ? 24 : -18
  if (plan.area.id !== 'all') score += plan.area.match.some(area => spot.area.includes(area)) ? 18 : -8
  if (spot.legend) score += 4
  score += ((spot.id * 13 + shuffle * 17) % 11) - 5
  return score
}

function ChoiceRow({ label, value, options, onChange, tone = 'teal' }) {
  const activeColor = tone === 'red' ? C.accent : C.primary
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '70px minmax(0, 1fr)', gap: 9, alignItems: 'center' }}>
      <div style={{
        fontFamily: FONTS.body, fontSize: 10.5, fontWeight: 800,
        color: C.muted, letterSpacing: 1.1, textTransform: 'uppercase',
      }}>{label}</div>
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: 1 }}>
        {options.map(option => {
          const active = value === option.id
          return (
            <Tap
              key={option.id}
              onClick={() => onChange(option.id)}
              scale={0.94}
              style={{
                flexShrink: 0, display: 'inline-flex', alignItems: 'center', gap: 7,
                minHeight: 34, padding: '0 12px', borderRadius: 12,
                background: active ? activeColor : 'rgba(255,255,255,0.62)',
                color: active ? '#fff' : C.text,
                border: active ? `1px solid ${activeColor}` : `1px solid ${C.border}`,
                boxShadow: active ? '0 8px 18px rgba(0,101,119,0.16)' : '0 1px 0 rgba(255,255,255,0.7) inset',
                fontFamily: FONTS.body, fontSize: 12, fontWeight: 700,
              }}
            >
              <Icon name={option.icon} size={14} color={active ? '#fff' : activeColor} stroke={2} />
              {option.label}
            </Tap>
          )
        })}
      </div>
    </div>
  )
}

function MatchMeter({ value }) {
  return (
    <div style={{ width: 74 }}>
      <div style={{ height: 5, borderRadius: 10, background: 'rgba(0,101,119,0.12)', overflow: 'hidden' }}>
        <div style={{
          width: `${value}%`, height: '100%', borderRadius: 10,
          background: value > 78 ? C.primary : '#c49a2a',
          transition: 'width 420ms cubic-bezier(0.2,0.8,0.2,1)',
        }} />
      </div>
      <div style={{ fontFamily: FONTS.body, fontSize: 10, fontWeight: 700, color: C.muted, marginTop: 4 }}>
        {value}% match
      </div>
    </div>
  )
}

function PlanCard({ spot, rank, match, onOpen, saved, toggleSave }) {
  const labels = ['Best bet', 'Backup', 'Wildcard']
  const border = rank === 0 ? C.primary : C.border
  return (
    <Tap onClick={onOpen} scale={0.985} style={{
      position: 'relative', background: '#fffdfa', borderRadius: 16, padding: 13,
      boxShadow: rank === 0 ? '0 12px 30px rgba(0,101,119,0.14)' : C.shadowWarm,
      border: `1.5px solid ${border}`, overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', right: -20, top: -28,
        fontFamily: FONTS.display, fontWeight: 800, fontSize: 98,
        color: rank === 0 ? C.primary : C.border, opacity: rank === 0 ? 0.08 : 0.42,
        lineHeight: 1,
      }}>{rank + 1}</div>
      <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', gap: 12 }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <span style={{
              fontFamily: FONTS.body, fontSize: 10, fontWeight: 800,
              color: rank === 0 ? C.primary : C.muted, letterSpacing: 1.15, textTransform: 'uppercase',
            }}>{labels[rank]}</span>
            {spot.legend && (
              <span style={{
                fontFamily: FONTS.body, fontSize: 9.5, fontWeight: 800,
                color: '#8b6a1a', background: 'rgba(196,154,42,0.16)',
                padding: '3px 7px', borderRadius: 999,
              }}>Legend</span>
            )}
          </div>
          <div style={{
            fontFamily: FONTS.display, fontWeight: 800, fontSize: 21,
            color: C.text, letterSpacing: -0.3, marginTop: 4, lineHeight: 1.1,
          }}>{spot.name}</div>
          <div style={{ fontFamily: FONTS.body, fontSize: 12, color: C.muted, marginTop: 4 }}>
            {spot.area} | {spot.price} | {spot.bestTime}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 9, flexShrink: 0 }}>
          <BookmarkBtn saved={saved} onToggle={toggleSave} size={34} />
          <MatchMeter value={match} />
        </div>
      </div>
      <div style={{ position: 'relative', marginTop: 11 }}>
        <Tagline>{spot.shareLine}</Tagline>
      </div>
      <div style={{ position: 'relative', marginTop: 10, display: 'flex', gap: 6, overflowX: 'auto', scrollbarWidth: 'none' }}>
        <span style={{ fontFamily: FONTS.body, fontSize: 11, fontWeight: 700, color: '#8b6a1a', background: 'rgba(196,154,42,0.14)', padding: '5px 9px', borderRadius: 999, whiteSpace: 'nowrap' }}>
          Order: {spot.signatureOrder}
        </span>
        <span style={{ fontFamily: FONTS.body, fontSize: 11, fontWeight: 700, color: C.primary, background: 'rgba(0,101,119,0.08)', padding: '5px 9px', borderRadius: 999, whiteSpace: 'nowrap' }}>
          {spot.perfectFor}
        </span>
      </div>
    </Tap>
  )
}

export default function Plan({ onOpenSpot, savedIds, toggleSave }) {
  const [groupId, setGroupId] = useState('date')
  const [budgetId, setBudgetId] = useState('all')
  const [timeId, setTimeId] = useState('evening')
  const [areaId, setAreaId] = useState('all')
  const [shuffle, setShuffle] = useState(0)
  const [copied, setCopied] = useState('idle')

  const plan = {
    group: GROUPS.find(g => g.id === groupId),
    budget: BUDGETS.find(b => b.id === budgetId),
    time: TIMES.find(t => t.id === timeId),
    area: AREA_GROUPS.find(a => a.id === areaId),
  }

  const ranked = useMemo(() => {
    const scored = [...SPOTS]
      .map(spot => ({ spot, score: scoreSpot(spot, plan, shuffle) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
    const best = scored[0]?.score || 1
    return scored.map(item => ({
      ...item,
      match: Math.max(68, Math.min(96, Math.round((item.score / best) * 94))),
    }))
  }, [groupId, budgetId, timeId, areaId, shuffle])

  const picks = ranked.map(item => item.spot)
  const title = `${plan.group.label} plan in Bhopal`
  const shareText = `${title} on Chai & Chill:\n${picks.map((p, i) => `${i + 1}. ${p.name} - ${p.area} (${p.signatureOrder})`).join('\n')}\n\nBawa verdict: ${picks[0]?.shareLine}`

  const handleShare = async () => {
    const url = window.location.origin
    if (navigator.share) {
      try {
        await navigator.share({ title: `${title} - Chai & Chill`, text: shareText, url })
      } catch { /* user cancelled */ }
    } else {
      try {
        await navigator.clipboard.writeText(`${shareText}\n${url}`)
        setCopied('done')
      } catch {
        setCopied('blocked')
      }
      setTimeout(() => setCopied('idle'), 1800)
    }
  }

  const top = picks[0]

  return (
    <div data-scroll-root style={{
      background: 'linear-gradient(180deg, #fff8f0 0%, #fffdf8 44%, #f5ede3 100%)',
      height: '100%', overflowY: 'auto', overflowX: 'hidden', paddingBottom: 118,
    }}>
      <div style={{ padding: '46px 18px 0' }}>
        <Enter keyId="plan-hero">
          <div style={{
            position: 'relative', overflow: 'hidden',
            background: '#12383b', borderRadius: 20, padding: '16px 17px 15px',
            boxShadow: '0 18px 42px rgba(18,56,59,0.24)',
            color: '#fff',
          }}>
            <div style={{
              position: 'absolute', inset: 0, opacity: 0.2,
              backgroundImage: 'radial-gradient(circle at center, rgba(255,248,240,0.72) 1px, transparent 1.6px)',
              backgroundSize: '15px 15px',
            }} />
            <div style={{
              position: 'absolute', right: -46, top: -52, width: 150, height: 150,
              borderRadius: 150, background: 'rgba(181,38,25,0.32)', filter: 'blur(18px)',
            }} />
            <div style={{ position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                <div style={{ fontFamily: FONTS.body, fontSize: 10, fontWeight: 800, letterSpacing: 1.4, textTransform: 'uppercase', color: 'rgba(255,248,240,0.72)' }}>
                  Chai council
                </div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: FONTS.body, fontSize: 10.5, fontWeight: 800, color: '#faecc0' }}>
                  <Icon name="spark" size={13} color="#faecc0" stroke={2.2} />
                  no sponsored picks
                </div>
              </div>
              <div style={{
                fontFamily: FONTS.display, fontWeight: 800, fontSize: 29,
                lineHeight: 1.02, letterSpacing: -0.5, marginTop: 13,
              }}>
                Decide the plan,<br />not just the place.
              </div>
              <div style={{ fontFamily: FONTS.body, fontSize: 12.5, lineHeight: 1.4, color: 'rgba(255,248,240,0.82)', marginTop: 9, maxWidth: 292 }}>
                A Bhopal-first shortlist made for the group chat: one best bet, one backup, one wildcard.
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                <div style={{ background: 'rgba(255,248,240,0.12)', border: '1px solid rgba(255,248,240,0.18)', borderRadius: 12, padding: '6px 9px', minWidth: 74 }}>
                  <div style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 18 }}>{SPOTS.length}</div>
                  <div style={{ fontFamily: FONTS.body, fontSize: 10, color: 'rgba(255,248,240,0.7)' }}>curated</div>
                </div>
                <div style={{ background: 'rgba(255,248,240,0.12)', border: '1px solid rgba(255,248,240,0.18)', borderRadius: 12, padding: '6px 9px', minWidth: 74 }}>
                  <div style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 18 }}>3</div>
                  <div style={{ fontFamily: FONTS.body, fontSize: 10, color: 'rgba(255,248,240,0.7)' }}>picks</div>
                </div>
              </div>
            </div>
          </div>
        </Enter>
      </div>

      <div style={{ padding: '12px 18px 0' }}>
        <div style={{
          background: 'rgba(255,255,255,0.72)', border: `1px solid ${C.border}`,
          borderRadius: 18, padding: 11,
          boxShadow: '0 12px 30px rgba(0,101,119,0.08)',
          backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
        }}>
          <ChoiceRow label="Crew" value={groupId} options={GROUPS} onChange={setGroupId} />
          <div style={{ height: 9 }} />
          <ChoiceRow label="Budget" value={budgetId} options={BUDGETS} onChange={setBudgetId} tone="red" />
          <div style={{ height: 9 }} />
          <ChoiceRow label="Time" value={timeId} options={TIMES} onChange={setTimeId} />
          <div style={{ height: 9 }} />
          <ChoiceRow label="Side of town" value={areaId} options={AREA_GROUPS} onChange={setAreaId} tone="red" />
        </div>
      </div>

      <Reveal style={{ padding: '12px 18px 0' }}>
        <div style={{
          position: 'relative', overflow: 'hidden',
          background: '#fffdfa', border: '1.5px solid rgba(196,154,42,0.34)',
          borderRadius: 22, padding: '18px 17px 16px',
          boxShadow: '0 16px 38px rgba(196,154,42,0.16)',
        }}>
          <div style={{ position: 'absolute', left: -8, top: '50%', width: 16, height: 16, borderRadius: 16, background: C.bg }} />
          <div style={{ position: 'absolute', right: -8, top: '50%', width: 16, height: 16, borderRadius: 16, background: C.bg }} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <div>
              <div style={{ fontFamily: FONTS.body, fontSize: 10.5, fontWeight: 900, color: '#8b6a1a', letterSpacing: 1.4, textTransform: 'uppercase' }}>
                Tonight's ticket
              </div>
              <div style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 26, color: C.text, letterSpacing: -0.5, lineHeight: 1.06, marginTop: 6 }}>
                {top?.name}
              </div>
              <div style={{ fontFamily: FONTS.body, fontSize: 12.5, color: C.muted, marginTop: 6 }}>
                {plan.group.label} | {plan.time.label} | {plan.area.label}
              </div>
            </div>
            <div style={{
              width: 58, height: 58, borderRadius: 18,
              background: 'linear-gradient(145deg, #006577, #12383b)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', boxShadow: '0 10px 22px rgba(0,101,119,0.22)',
              flexShrink: 0,
            }}>
              <Icon name="spark" size={25} color="#fff" stroke={2.1} />
            </div>
          </div>
          <div style={{ fontFamily: FONTS.body, fontSize: 13, lineHeight: 1.45, color: C.text, marginTop: 12 }}>
            {plan.group.line} Start here, keep the other two as backups.
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 15 }}>
            <Tap onClick={handleShare} style={{
              flex: 1, minHeight: 44, borderRadius: 14,
              background: C.accent, color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              fontFamily: FONTS.body, fontSize: 13.5, fontWeight: 800,
              boxShadow: '0 10px 20px rgba(181,38,25,0.22)',
            }}>
              <Icon name={copied === 'done' ? 'check' : 'share'} size={16} color="#fff" stroke={2.2} />
              {copied === 'done' ? 'Copied' : copied === 'blocked' ? 'Copy blocked' : 'Share verdict'}
            </Tap>
            <Tap onClick={() => setShuffle(s => s + 1)} style={{
              width: 48, minHeight: 44, borderRadius: 14,
              background: 'rgba(0,101,119,0.08)', color: C.primary,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '1px solid rgba(0,101,119,0.12)',
            }}>
              <Icon name="spark" size={18} color={C.primary} stroke={2.2} />
            </Tap>
          </div>
        </div>
      </Reveal>

      <div style={{ padding: '15px 18px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {ranked.map((item, i) => (
          <Reveal key={`${item.spot.id}-${groupId}-${budgetId}-${timeId}-${areaId}-${shuffle}`} delay={i * 60}>
            <PlanCard
              spot={item.spot}
              rank={i}
              match={item.match}
              onOpen={() => onOpenSpot(item.spot)}
              saved={savedIds.includes(item.spot.id)}
              toggleSave={() => toggleSave(item.spot.id)}
            />
          </Reveal>
        ))}
      </div>
    </div>
  )
}
