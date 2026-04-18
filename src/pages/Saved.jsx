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
          <div style={{
            width: 180, height: 180, borderRadius: 180,
            background: C.surface, position: 'relative',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 28,
          }}>
            <div style={{ position: 'absolute', inset: 0, borderRadius: 180, boxShadow: 'inset 0 0 0 1px rgba(0,101,119,0.08)' }} />
            <div style={{ animation: 'float 3s ease-in-out infinite', display: 'inline-flex' }}>
              <Icon name="bookmark" size={70} color={C.primary} stroke={1.4} />
            </div>
            <div style={{ position: 'absolute', top: 24, right: 30, fontFamily: FONTS.display, fontStyle: 'italic', fontSize: 38, color: C.accent, opacity: 0.5, lineHeight: 1 }}>?</div>
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
