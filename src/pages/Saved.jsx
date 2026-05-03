import { useState } from 'react'
import { C, FONTS, Icon, SpotImage, Rating, Tagline, Tap, Reveal, Enter, BookmarkBtn } from '../ui/primitives.jsx'
import { SPOTS, MOODS } from '../data/adapted.js'

const LISTS = [
  { id: 'all', label: 'All', icon: 'bookmark', pick: () => true },
  { id: 'date', label: 'Date ideas', icon: 'heart', pick: s => s.tags.includes('date') },
  { id: 'work', label: 'Work cafes', icon: 'laptop', pick: s => s.tags.includes('work') || s.tags.includes('study') },
  { id: 'family', label: 'Take parents', icon: 'users', pick: s => s.tags.includes('family') || s.legend },
]

function SpotCard({ spot, onOpen, toggleSave }) {
  return (
    <Tap onClick={onOpen} scale={0.985} style={{
      background: '#fffdfa', borderRadius: 18, overflow: 'hidden',
      boxShadow: C.shadowWarm, border: `1px solid ${C.border}`,
    }}>
      <div style={{ padding: 10, position: 'relative' }}>
        <SpotImage spot={spot} moods={MOODS} height={138} rounded={14} />
        <div style={{ position: 'absolute', top: 18, right: 18 }}>
          <BookmarkBtn saved={true} onToggle={toggleSave} />
        </div>
      </div>
      <div style={{ padding: '4px 15px 15px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 21, color: C.text, letterSpacing: -0.3, lineHeight: 1.1 }}>
              {spot.name}
            </div>
            <div style={{ fontFamily: FONTS.body, fontSize: 12, color: C.muted, marginTop: 4, display: 'flex', gap: 7, alignItems: 'center', flexWrap: 'wrap' }}>
              <span>{spot.area}</span><span>|</span>
              <Rating value={spot.rating} /><span>|</span><span>{spot.price}</span>
            </div>
          </div>
          <div style={{
            alignSelf: 'flex-start', flexShrink: 0,
            background: 'rgba(0,101,119,0.08)', color: C.primary,
            borderRadius: 999, padding: '5px 8px',
            fontFamily: FONTS.body, fontSize: 10.5, fontWeight: 800,
          }}>
            {spot.bestTime}
          </div>
        </div>
        <div style={{ marginTop: 10 }}>
          <Tagline>{spot.shareLine}</Tagline>
        </div>
        <div style={{ marginTop: 10, display: 'flex', gap: 6, overflowX: 'auto', scrollbarWidth: 'none' }}>
          {['This one', 'Too far?', spot.signatureOrder].map(t => (
            <span key={t} style={{
              fontFamily: FONTS.body, fontSize: 11, fontWeight: 800,
              color: t === 'This one' ? '#1f6d41' : C.muted,
              background: t === 'This one' ? 'rgba(42,154,90,0.13)' : C.surface,
              padding: '5px 9px', borderRadius: 999, whiteSpace: 'nowrap',
            }}>{t}</span>
          ))}
        </div>
      </div>
    </Tap>
  )
}

export default function Saved({ onOpenSpot, savedIds, toggleSave, onNavigate }) {
  const [listId, setListId] = useState('all')
  const [copied, setCopied] = useState('idle')
  const savedSpots = SPOTS.filter(s => savedIds.includes(s.id))
  const activeList = LISTS.find(l => l.id === listId) || LISTS[0]
  const visibleSpots = savedSpots.filter(activeList.pick)
  const topThree = savedSpots.slice(0, 3)

  const shareShortlist = async () => {
    if (!savedSpots.length) return
    const text = `Help me pick a Chai & Chill plan:\n${topThree.map((s, i) => `${i + 1}. ${s.name} - ${s.area} (${s.signatureOrder})`).join('\n')}\n\n${window.location.origin}`
    if (navigator.share) {
      try {
        await navigator.share({ title: 'My Chai & Chill shortlist', text, url: window.location.origin })
      } catch { /* user cancelled */ }
    } else {
      try {
        await navigator.clipboard.writeText(text)
        setCopied('done')
      } catch {
        setCopied('blocked')
      }
      setTimeout(() => setCopied('idle'), 1800)
    }
  }

  if (savedSpots.length === 0) {
    return (
      <div data-scroll-root style={{
        background: C.bg, height: '100%', overflowY: 'auto', overflowX: 'hidden',
        paddingBottom: 110, display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ padding: '62px 20px 0' }}>
          <div style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 32, color: C.text, letterSpacing: -0.6 }}>Shortlist</div>
          <div style={{ fontFamily: FONTS.body, fontSize: 13, color: C.muted, marginTop: 5 }}>
            Save 3 places, then send the plan.
          </div>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 30px' }}>
          <div style={{ animation: 'float 3s ease-in-out infinite', marginBottom: 24 }}>
            <svg viewBox="0 0 140 120" width="140" height="120">
              <path d="M22 68 C38 38 70 28 104 42 C120 49 126 67 117 82 C102 106 58 108 33 91 C23 84 18 77 22 68Z" fill="#f5ede3" stroke="#c49a2a" strokeWidth="2"/>
              <path d="M38 70 L61 52 L80 68 L104 45" fill="none" stroke="#006577" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="38" cy="70" r="5" fill="#b52619"/>
              <circle cx="61" cy="52" r="5" fill="#b52619"/>
              <circle cx="80" cy="68" r="5" fill="#b52619"/>
              <circle cx="104" cy="45" r="5" fill="#b52619"/>
            </svg>
          </div>
          <div style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 24, color: C.text, letterSpacing: -0.3, textAlign: 'center' }}>
            Your future plan is empty
          </div>
          <div style={{ fontFamily: FONTS.body, fontSize: 14, color: C.muted, marginTop: 10, textAlign: 'center', maxWidth: 278, lineHeight: 1.5 }}>
            Save a few contenders. Chai & Chill will help you turn them into a group decision.
          </div>
          <Tap onClick={() => onNavigate('explore')} style={{
            marginTop: 24, display: 'inline-flex', alignItems: 'center', gap: 8,
            background: C.primary, color: '#fff',
            padding: '13px 22px', borderRadius: 14,
            fontFamily: FONTS.body, fontWeight: 800, fontSize: 14,
            boxShadow: '0 6px 16px rgba(0,101,119,0.24)',
          }}>
            Find contenders <Icon name="arrowRight" size={14} color="#fff" stroke={2.2} />
          </Tap>
        </div>
      </div>
    )
  }

  return (
    <div data-scroll-root style={{ background: C.bg, height: '100%', overflowY: 'auto', overflowX: 'hidden', paddingBottom: 110 }}>
      <div style={{ padding: '62px 20px 0' }}>
        <Enter delay={0} keyId="shortlist-h">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12 }}>
            <div>
              <div style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 32, color: C.text, letterSpacing: -0.6 }}>Shortlist</div>
              <div style={{ fontFamily: FONTS.body, fontSize: 13, color: C.muted, marginTop: 4 }}>
                {savedSpots.length} contenders for your next plan
              </div>
            </div>
            <Tap onClick={shareShortlist} style={{
              width: 42, height: 42, borderRadius: 14,
              background: C.accent, display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 8px 18px rgba(181,38,25,0.24)',
            }}>
              <Icon name={copied === 'done' ? 'check' : 'share'} size={17} color="#fff" stroke={2.2} />
            </Tap>
          </div>
        </Enter>

        <div style={{
          marginTop: 16, background: '#12383b', color: '#fff',
          borderRadius: 18, padding: '16px 16px 15px',
          boxShadow: '0 12px 30px rgba(0,101,119,0.18)',
        }}>
          <div style={{ fontFamily: FONTS.body, fontSize: 10.5, fontWeight: 900, letterSpacing: 1.3, textTransform: 'uppercase', color: 'rgba(255,248,240,0.72)' }}>
            Send to group chat
          </div>
          <div style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 22, lineHeight: 1.1, marginTop: 5 }}>
            Help me pick one.
          </div>
          <div style={{ fontFamily: FONTS.body, fontSize: 12.8, lineHeight: 1.45, color: 'rgba(255,248,240,0.82)', marginTop: 6 }}>
            {topThree.map(s => s.name).join(' vs ')}
          </div>
          <div style={{ marginTop: 11, fontFamily: FONTS.body, fontSize: 11.5, fontWeight: 800, color: copied === 'blocked' ? '#ffd4de' : '#faecc0' }}>
            {copied === 'done' ? 'Copied shortlist' : copied === 'blocked' ? 'Copy blocked in this browser' : 'Tap share when the group starts arguing.'}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', scrollbarWidth: 'none', padding: '18px 20px 2px' }}>
        {LISTS.map(list => (
          <Tap key={list.id} onClick={() => setListId(list.id)} scale={0.94} style={{
            flexShrink: 0, display: 'inline-flex', alignItems: 'center', gap: 7,
            minHeight: 36, padding: '0 12px', borderRadius: 13,
            background: listId === list.id ? C.primary : '#fffdfa',
            color: listId === list.id ? '#fff' : C.text,
            border: listId === list.id ? `1px solid ${C.primary}` : `1px solid ${C.border}`,
            fontFamily: FONTS.body, fontSize: 12.5, fontWeight: 800,
          }}>
            <Icon name={list.icon} size={14} color={listId === list.id ? '#fff' : C.primary} stroke={2} />
            {list.label}
          </Tap>
        ))}
      </div>

      <div style={{ padding: '14px 20px 0', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {visibleSpots.length === 0 && (
          <div style={{ background: C.surface, borderRadius: 16, padding: 18, textAlign: 'center', fontFamily: FONTS.display, fontStyle: 'italic', color: C.muted }}>
            Is list mein abhi koi contender nahi.
          </div>
        )}
        {visibleSpots.map((s, i) => (
          <Reveal key={s.id} delay={i * 50}>
            <SpotCard spot={s} onOpen={() => onOpenSpot(s)} toggleSave={() => toggleSave(s.id)} />
          </Reveal>
        ))}
      </div>
    </div>
  )
}
