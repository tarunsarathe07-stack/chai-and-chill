import { C, FONTS, Icon, SpotImage, Tap, Reveal, Enter } from '../ui/primitives.jsx'
import { SPOTS, MOODS, BAWA_TIPS } from '../data/adapted.js'

const MOOD_ICONS = { date: 'heart', solo: 'coffee', budget: 'rupee', squad: 'users', insta: 'camera', work: 'laptop' }

const getDailyPick = () => {
  const today = new Date()
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate()
  return SPOTS[seed % SPOTS.length]
}
const dailyPick = getDailyPick()

function SectionHeader({ children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ width: 3, height: 18, background: C.primary, borderRadius: 2, flexShrink: 0 }} />
      <div style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 18, color: C.text, letterSpacing: -0.2 }}>
        {children}
      </div>
    </div>
  )
}

function MoodTile({ mood, onClick }) {
  return (
    <Tap onClick={onClick} scale={0.94} style={{
      borderRadius: 16, overflow: 'hidden', position: 'relative',
      background: mood.grad, minHeight: 140, padding: 16,
      boxShadow: '0 4px 14px rgba(0,101,119,0.08), inset 0 1px 0 rgba(255,255,255,0.5), inset 0 0 0 1px rgba(255,255,255,0.25)',
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: mood.accent }} />
      <div style={{
        position: 'absolute', right: -10, bottom: -22,
        fontFamily: FONTS.display, fontWeight: 800, fontSize: 72,
        color: mood.accent, opacity: 0.245,
        letterSpacing: -3, lineHeight: 1, pointerEvents: 'none',
      }}>{mood.big}</div>
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', height: '100%', minHeight: 108 }}>
        <div style={{
          width: 30, height: 30, borderRadius: 8,
          background: 'rgba(255,255,255,0.7)',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name={MOOD_ICONS[mood.id]} size={16} color={mood.accent} stroke={1.8} />
        </div>
        <div style={{ marginTop: 'auto' }}>
          <div style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 16, color: '#1a1a1a', lineHeight: 1.1, letterSpacing: -0.2 }}>
            {mood.name}
          </div>
          <div style={{ fontFamily: FONTS.body, fontSize: 11, color: '#8a7a6a', marginTop: 4, fontWeight: 500 }}>
            {SPOTS.filter(s => s.tags.includes(mood.id)).length} spots
          </div>
        </div>
      </div>
    </Tap>
  )
}

export default function Home({ onNavigate, onOpenSpot, bawaTipIdx }) {
  const tipIdx = bawaTipIdx % BAWA_TIPS.length

  return (
    <div data-scroll-root style={{
      background: C.bg, height: '100%', overflowY: 'auto', overflowX: 'hidden',
      paddingBottom: 110,
    }}>
      {/* Top bar */}
      <div style={{ padding: '62px 20px 8px', display: 'flex', alignItems: 'center' }}>
        <div style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 20, color: C.primary, letterSpacing: -0.3 }}>
          Chai &amp; Chill
        </div>
      </div>

      {/* Hero card */}
      <div style={{ padding: '12px 20px 0' }}>
        <div style={{
          background: C.primary, borderRadius: 20,
          padding: '28px 24px 32px', position: 'relative', overflow: 'hidden',
          minHeight: 280,
          boxShadow: '0 10px 30px rgba(0,101,119,0.22)',
          textAlign: 'left',
        }}>
          <div style={{
            position: 'absolute', inset: 0, opacity: 0.2,
            backgroundImage: 'radial-gradient(circle at center, rgba(255,248,240,0.6) 1px, transparent 1.5px)',
            backgroundSize: '16px 16px',
          }} />
          <div style={{
            position: 'absolute', right: -40, top: -40, width: 160, height: 160,
            borderRadius: 160, background: 'rgba(181,38,25,0.22)', filter: 'blur(28px)',
          }} />
          <div style={{ position: 'relative' }}>
            <Enter delay={0} keyId="hero-label">
              <div style={{ fontFamily: FONTS.body, fontSize: 10.5, fontWeight: 600, color: 'rgba(255,248,240,0.82)', letterSpacing: 2, textTransform: 'uppercase' }}>
                Bhopal · 57 Spots Curated
              </div>
            </Enter>
            <Enter delay={100} keyId="hero-h">
              <div style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 36, lineHeight: 1.1, color: '#fff', marginTop: 14, letterSpacing: '-0.5px' }}>
                Kya mood hai,<br />bawa?
              </div>
            </Enter>
            <Enter delay={200} keyId="hero-sub">
              <div style={{ fontFamily: FONTS.body, fontSize: 14.5, lineHeight: 1.5, color: 'rgba(255,248,240,0.85)', marginTop: 14, maxWidth: 260 }}>
                Bhopal ke best spots. Ek Bhopali ki nazar se.
              </div>
            </Enter>
            <Enter delay={300} keyId="hero-btn">
              <Tap onClick={() => onNavigate('explore')} style={{
                marginTop: 26, display: 'inline-flex', alignItems: 'center', gap: 8,
                background: C.accent, color: '#fff',
                padding: '13px 22px', borderRadius: 100,
                fontFamily: FONTS.body, fontWeight: 500, fontSize: 14,
                boxShadow: '0 6px 16px rgba(181,38,25,0.32)',
              }}>
                Show me the best
                <Icon name="arrowRight" size={14} color="#fff" stroke={2.2} />
              </Tap>
            </Enter>
          </div>
        </div>
      </div>

      {/* Explore by Mood */}
      <div style={{ padding: '30px 20px 10px' }}>
        <SectionHeader>Explore by Mood</SectionHeader>
      </div>
      <div style={{ padding: '0 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {MOODS.map((m, i) => (
          <Reveal key={m.id} delay={i * 80}>
            <MoodTile mood={m} onClick={() => onNavigate('mood', m.id)} />
          </Reveal>
        ))}
      </div>

      {/* Popular Areas */}
      <div style={{ padding: '30px 20px 10px' }}>
        <SectionHeader>Popular Areas</SectionHeader>
      </div>
      <div style={{ display: 'flex', gap: 8, padding: '0 20px 4px', overflowX: 'auto', scrollbarWidth: 'none' }}>
        {['Arera Colony', 'MP Nagar', 'Old Bhopal', 'Shyamla Hills', 'Kerwa Dam'].map(a => (
          <Tap key={a} onClick={() => onNavigate('explore')} scale={0.94} style={{
            display: 'inline-flex', alignItems: 'center',
            padding: '8px 14px', borderRadius: 100,
            border: `1.5px solid ${C.primary}`,
            background: 'transparent', color: C.primary,
            fontFamily: FONTS.body, fontSize: 13, fontWeight: 500,
            whiteSpace: 'nowrap', flexShrink: 0,
          }}>{a}</Tap>
        ))}
      </div>

      {/* Today's Pick */}
      <div style={{ padding: '30px 20px 0' }}>
        <SectionHeader>Today's Pick</SectionHeader>
      </div>
      <div style={{ padding: '10px 20px 0' }}>
        <Reveal>
          <Tap onClick={() => onOpenSpot(dailyPick)} style={{
            background: '#fff', borderRadius: 20, overflow: 'hidden',
            boxShadow: C.shadowWarm,
          }}>
            <div style={{ padding: 10 }}>
              <SpotImage spot={dailyPick} moods={MOODS} height={170} rounded={14} />
            </div>
            <div style={{ padding: '6px 16px 18px' }}>
              <div style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 22, color: C.text, letterSpacing: -0.3 }}>
                {dailyPick.name}
              </div>
              <div style={{ fontFamily: FONTS.body, fontSize: 12, color: C.muted, marginTop: 3, display: 'flex', gap: 8, alignItems: 'center' }}>
                <span>{dailyPick.area}</span><span>·</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, color: C.text }}>
                  <Icon name="starFill" size={12} color="#c49a2a" /> {dailyPick.rating}
                </span>
                <span>·</span><span>{dailyPick.price}</span>
              </div>
              <div style={{ marginTop: 12 }}>
                <div style={{
                  fontFamily: FONTS.display, fontStyle: 'italic', fontSize: 14,
                  color: C.text, lineHeight: 1.4,
                  borderLeft: `2px solid ${C.primary}`,
                  paddingLeft: 10, paddingTop: 4, paddingBottom: 4, paddingRight: 6,
                  background: 'rgba(0,101,119,0.04)', borderRadius: '0 6px 6px 0',
                }}>{dailyPick.tagline}</div>
              </div>
              <div style={{ marginTop: 14, fontFamily: FONTS.body, fontSize: 13, color: C.primary, fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                View Spot <span style={{ marginLeft: 2 }}>→</span>
              </div>
            </div>
          </Tap>
        </Reveal>
      </div>

      {/* Bawa's Tip */}
      <div style={{ padding: '30px 20px 0' }}>
        <Reveal>
          <div style={{ background: C.surface, borderRadius: 20, padding: '22px 22px 20px', position: 'relative', overflow: 'hidden' }}>
            <div style={{
              fontFamily: FONTS.display, fontWeight: 800, fontSize: 80,
              color: C.primary, opacity: 0.25, position: 'absolute',
              top: 0, left: 14, lineHeight: 1,
            }}>"</div>
            <div style={{ fontFamily: FONTS.display, fontStyle: 'italic', fontSize: 17, color: C.text, lineHeight: 1.45, paddingTop: 24, paddingLeft: 6, maxWidth: '92%' }}>
              {BAWA_TIPS[tipIdx]}
            </div>
            <div style={{ fontFamily: FONTS.body, fontSize: 12, color: C.muted, marginTop: 12, paddingLeft: 6, letterSpacing: 0.3 }}>
              — Bawa's Tip
            </div>
          </div>
        </Reveal>
      </div>

      {/* Footer */}
      <div style={{ padding: '32px 28px 20px', textAlign: 'center' }}>
        <div style={{ fontFamily: FONTS.display, fontStyle: 'italic', fontSize: 14, color: C.muted, lineHeight: 1.6 }}>
          No ads. No sponsored listings.<br />
          Bhopal ke best spots sirf<br />
          Bhopalion ko pata hone chahiye.
        </div>
        <div style={{ fontFamily: FONTS.body, fontSize: 11, color: C.muted, marginTop: 18, opacity: 0.85 }}>
          Curated by Tarun <span style={{ color: C.accent }}>♥</span>
        </div>
      </div>
    </div>
  )
}
