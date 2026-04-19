import { C, FONTS, Icon, SpotImage, Rating, Tagline, Tap, Reveal, Enter, BookmarkBtn } from '../ui/primitives.jsx'
import { SPOTS, MOODS } from '../data/adapted.js'

function SpotCard({ spot, onOpen, toggleSave }) {
  return (
    <Tap onClick={onOpen} style={{ background: '#fff', borderRadius: 20, overflow: 'hidden', boxShadow: C.shadowWarm }}>
      <div style={{ padding: 10, position: 'relative' }}>
        <SpotImage spot={spot} moods={MOODS} height={160} rounded={14} />
        <div style={{ position: 'absolute', top: 18, right: 18 }}>
          <BookmarkBtn saved={true} onToggle={toggleSave} />
        </div>
      </div>
      <div style={{ padding: '6px 16px 16px' }}>
        <div style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 22, color: C.text, letterSpacing: -0.3 }}>{spot.name}</div>
        <div style={{ fontFamily: FONTS.body, fontSize: 12, color: C.muted, marginTop: 3, display: 'flex', gap: 8, alignItems: 'center' }}>
          <span>{spot.area}</span><span>·</span>
          <Rating value={spot.rating} /><span>·</span><span>{spot.price}</span>
        </div>
        <div style={{ marginTop: 10 }}>
          <Tagline>{spot.tagline}</Tagline>
        </div>
      </div>
    </Tap>
  )
}

export default function Saved({ onOpenSpot, savedIds, toggleSave, onNavigate }) {
  const savedSpots = SPOTS.filter(s => savedIds.includes(s.id))

  if (savedSpots.length === 0) {
    return (
      <div data-scroll-root style={{
        background: C.bg, height: '100%', overflowY: 'auto', overflowX: 'hidden',
        paddingBottom: 110, display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ padding: '62px 20px 0' }}>
          <div style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 32, color: C.text, letterSpacing: -0.6 }}>Saved</div>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 30px' }}>
          <div style={{ animation: 'float 3s ease-in-out infinite', marginBottom: 28 }}>
            <svg viewBox="0 0 120 120" width="120" height="120">
              <path d="M30 45 Q28 85 35 95 Q60 105 85 95 Q92 85 90 45 Z"
                    fill="#f5ede3" stroke="#c49a2a" strokeWidth="2"/>
              <ellipse cx="60" cy="45" rx="30" ry="8"
                       fill="#faecc0" stroke="#c49a2a" strokeWidth="2"/>
              <circle cx="50" cy="68" r="3" fill="#8a7a6a"/>
              <circle cx="70" cy="68" r="3" fill="#8a7a6a"/>
              <path d="M50 82 Q60 76 70 82"
                    fill="none" stroke="#8a7a6a" strokeWidth="2"
                    strokeLinecap="round"/>
              <path d="M50 38 Q48 30 50 24"
                    fill="none" stroke="#c49a2a" strokeWidth="1.5"
                    strokeLinecap="round" opacity="0.5"/>
              <path d="M60 36 Q58 26 60 18"
                    fill="none" stroke="#c49a2a" strokeWidth="1.5"
                    strokeLinecap="round" opacity="0.5"/>
              <path d="M70 38 Q68 30 70 24"
                    fill="none" stroke="#c49a2a" strokeWidth="1.5"
                    strokeLinecap="round" opacity="0.5"/>
            </svg>
          </div>
          <div style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 24, color: C.text, letterSpacing: -0.3, textAlign: 'center' }}>
            Abhi kuch saved nakko hai
          </div>
          <div style={{ fontFamily: FONTS.body, fontSize: 14, color: C.muted, marginTop: 10, textAlign: 'center', maxWidth: 270, lineHeight: 1.5 }}>
            Spots dekho, jo pasand aaye wo save karo bawa.
          </div>
          <Tap onClick={() => onNavigate('explore')} style={{
            marginTop: 24, display: 'inline-flex', alignItems: 'center', gap: 8,
            background: C.primary, color: '#fff',
            padding: '13px 22px', borderRadius: 100,
            fontFamily: FONTS.body, fontWeight: 500, fontSize: 14,
            boxShadow: '0 6px 16px rgba(0,101,119,0.24)',
          }}>
            Explore spots <span>→</span>
          </Tap>
        </div>
      </div>
    )
  }

  return (
    <div data-scroll-root style={{ background: C.bg, height: '100%', overflowY: 'auto', overflowX: 'hidden', paddingBottom: 110 }}>
      <div style={{ padding: '62px 20px 0' }}>
        <Enter delay={0} keyId="saved-h">
          <div style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 32, color: C.text, letterSpacing: -0.6 }}>Your saved spots</div>
        </Enter>
        <Enter delay={80} keyId="saved-s">
          <div style={{ fontFamily: FONTS.body, fontSize: 13, color: C.muted, marginTop: 4 }}>
            {savedSpots.length} {savedSpots.length === 1 ? 'spot' : 'spots'} waiting for you
          </div>
        </Enter>
      </div>
      <div style={{ padding: '18px 20px 0', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {savedSpots.map((s, i) => (
          <Reveal key={s.id} delay={i * 50}>
            <SpotCard spot={s} onOpen={() => onOpenSpot(s)} toggleSave={() => toggleSave(s.id)} />
          </Reveal>
        ))}
      </div>
    </div>
  )
}
