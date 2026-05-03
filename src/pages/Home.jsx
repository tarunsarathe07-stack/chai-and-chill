import { useState } from 'react'
import { C, FONTS, Icon, SpotImage, Tap, Reveal, Enter } from '../ui/primitives.jsx'
import { SPOTS, MOODS, BAWA_TIPS } from '../data/adapted.js'

const FORMSPREE_ID = 'YOUR_FORM_ID' // sign up at formspree.io → new form → copy the ID

function SuggestSheet({ onClose }) {
  const [form, setForm] = useState({ name: '', area: '', why: '', whatsapp: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name.trim()) return
    setStatus('sending')
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          spot_name: form.name,
          area: form.area,
          why: form.why,
          whatsapp: form.whatsapp,
        }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  const inputStyle = {
    width: '100%', boxSizing: 'border-box',
    fontFamily: FONTS.body, fontSize: 14, color: C.text,
    background: C.surface, border: `1.5px solid ${C.border}`,
    borderRadius: 12, padding: '12px 14px',
    outline: 'none', resize: 'none',
    lineHeight: 1.5,
  }
  const labelStyle = {
    fontFamily: FONTS.body, fontSize: 11.5, fontWeight: 600,
    color: C.muted, letterSpacing: 0.6, textTransform: 'uppercase',
    display: 'block', marginBottom: 6,
  }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 50,
          background: 'rgba(0,0,0,0.4)',
          backdropFilter: 'blur(2px)', WebkitBackdropFilter: 'blur(2px)',
          animation: 'fadeIn 200ms ease-out',
        }}
      />

      {/* Sheet */}
      <div style={{
        position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: '100%', maxWidth: 430, zIndex: 51,
        background: '#fff8f0', borderRadius: '24px 24px 0 0',
        boxShadow: '0 -8px 40px rgba(0,0,0,0.18)',
        animation: 'sheetUp 320ms cubic-bezier(0.2,0.9,0.2,1)',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}>
        {/* Handle */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 4px' }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: C.border }} />
        </div>

        <div style={{ padding: '8px 22px 28px', overflowY: 'auto', maxHeight: '80vh' }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 18 }}>
            <div>
              <div style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 22, color: C.text, letterSpacing: -0.3 }}>
                Suggest a spot, bawa
              </div>
              <div style={{ fontFamily: FONTS.body, fontSize: 13, color: C.muted, marginTop: 3 }}>
                Found a hidden gem? Tell us about it.
              </div>
            </div>
            <Tap onClick={onClose} scale={0.88} style={{
              width: 34, height: 34, borderRadius: 100,
              background: C.surface, border: `1px solid ${C.border}`,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, marginLeft: 12,
            }}>
              <Icon name="close" size={16} color={C.muted} stroke={2} />
            </Tap>
          </div>

          {status === 'success' ? (
            <div style={{
              textAlign: 'center', padding: '32px 16px 16px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14,
            }}>
              <div style={{
                width: 64, height: 64, borderRadius: 64,
                background: 'rgba(42,154,90,0.12)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon name="check" size={28} color="#2a9a5a" stroke={2.2} />
              </div>
              <div style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 20, color: C.text }}>
                Shukriya bawa!
              </div>
              <div style={{ fontFamily: FONTS.body, fontSize: 14, color: C.muted, lineHeight: 1.5 }}>
                We'll check it out. Agar bhannat lagi toh zaroor add karenge.
              </div>
              <Tap onClick={onClose} style={{
                marginTop: 8, padding: '12px 28px', borderRadius: 100,
                background: C.primary, color: '#fff',
                fontFamily: FONTS.body, fontWeight: 500, fontSize: 14,
              }}>
                Done
              </Tap>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={labelStyle}>Spot name *</label>
                <input
                  value={form.name} onChange={set('name')} required
                  placeholder="e.g. Chai Wali Gali"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Area / Location</label>
                <input
                  value={form.area} onChange={set('area')}
                  placeholder="e.g. MP Nagar, near Z-square"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Kyun jaana chahiye?</label>
                <textarea
                  value={form.why} onChange={set('why')} rows={3}
                  placeholder="In your own words... kya khaas hai yahan?"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Your WhatsApp <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(optional)</span></label>
                <input
                  value={form.whatsapp} onChange={set('whatsapp')}
                  placeholder="So we can credit you if we add it"
                  type="tel"
                  style={inputStyle}
                />
              </div>

              {status === 'error' && (
                <div style={{ fontFamily: FONTS.body, fontSize: 13, color: C.accent }}>
                  Kuch gadbad ho gayi. Try again?
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'sending' || !form.name.trim()}
                style={{
                  all: 'unset', cursor: form.name.trim() ? 'pointer' : 'default',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  width: '100%', boxSizing: 'border-box',
                  background: form.name.trim() ? C.primary : C.border,
                  color: form.name.trim() ? '#fff' : C.muted,
                  padding: '15px 20px', borderRadius: 100,
                  fontFamily: FONTS.body, fontWeight: 500, fontSize: 15,
                  transition: 'background 200ms, color 200ms',
                  marginTop: 4,
                }}
              >
                {status === 'sending' ? 'Sending…' : 'Send it →'}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  )
}

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

const ASK_PROMPTS = [
  {
    id: 'sunset',
    icon: 'sun',
    text: 'Sunset + chai',
    title: 'Lake side, slow evening.',
    body: 'Upper Lake mood, golden-hour timing, and one spot where you do not need to pretend you are in a hurry.',
    mood: 'date',
  },
  {
    id: 'old',
    icon: 'compass',
    text: 'Old Bhopal breakfast',
    title: 'Poha, jalebi, heritage.',
    body: 'A proper morning trail with legendary places, short hops, and orders that actually matter.',
    mood: 'budget',
  },
  {
    id: 'work',
    icon: 'laptop',
    text: 'Quiet work cafe',
    title: 'Laptop open, noise low.',
    body: "Cafe picks where sitting for two hours feels normal, not like you are blocking someone's table.",
    mood: 'work',
  },
]

function BhopalScene() {
  return (
    <div style={{
      position: 'relative', height: 132, borderRadius: 18, overflow: 'hidden',
      background: 'linear-gradient(180deg, #f8d9b7 0%, #f5b27a 42%, #215760 43%, #0f3e49 100%)',
      boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.18)',
    }}>
      <div style={{
        position: 'absolute', left: 18, top: 18, width: 42, height: 42, borderRadius: 42,
        background: '#ffd280', boxShadow: '0 0 28px rgba(255,210,128,0.72)',
      }} />
      <svg viewBox="0 0 360 132" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <path d="M0 62 C54 46 82 68 121 54 C160 40 186 62 225 48 C273 31 305 45 360 34 L360 132 L0 132 Z" fill="rgba(5,42,52,0.36)" />
        <path d="M0 85 C50 78 78 92 119 82 C164 71 194 91 237 76 C286 59 320 71 360 64 L360 132 L0 132 Z" fill="rgba(8,73,83,0.72)" />
        <path d="M36 103 C88 95 129 102 174 96 C226 89 272 96 326 88" stroke="rgba(255,248,240,0.26)" strokeWidth="2" fill="none" />
        <path d="M55 113 C104 108 139 112 194 106 C235 102 276 106 319 100" stroke="rgba(255,248,240,0.16)" strokeWidth="1.5" fill="none" />
      </svg>
      <div style={{
        position: 'absolute', right: 14, bottom: 14,
        background: 'rgba(255,248,240,0.9)', color: C.primary,
        borderRadius: 12, padding: '8px 10px',
        fontFamily: FONTS.body, fontSize: 10.5, fontWeight: 800,
        letterSpacing: 1, textTransform: 'uppercase',
      }}>Upper Lake energy</div>
    </div>
  )
}

function AskCard({ active, onPick, onPlan }) {
  const item = ASK_PROMPTS[active]
  return (
    <div style={{
      marginTop: 14, background: 'rgba(255,255,255,0.74)', border: `1px solid ${C.border}`,
      borderRadius: 18, padding: 12,
      boxShadow: '0 12px 30px rgba(0,101,119,0.08)',
      backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        fontFamily: FONTS.body, fontSize: 11, fontWeight: 800,
        color: C.muted, letterSpacing: 1.2, textTransform: 'uppercase',
      }}>
        <Icon name="spark" size={14} color={C.accent} stroke={2.1} />
        Ask like a local
      </div>
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', scrollbarWidth: 'none', paddingTop: 11, paddingBottom: 2 }}>
        {ASK_PROMPTS.map((prompt, i) => (
          <Tap key={prompt.id} onClick={() => onPick(i)} scale={0.94} style={{
            flexShrink: 0, display: 'inline-flex', alignItems: 'center', gap: 7,
            minHeight: 36, padding: '0 12px', borderRadius: 13,
            background: active === i ? C.primary : '#fffdfa',
            color: active === i ? '#fff' : C.text,
            border: active === i ? `1px solid ${C.primary}` : `1px solid ${C.border}`,
            fontFamily: FONTS.body, fontSize: 12, fontWeight: 800,
          }}>
            <Icon name={prompt.icon} size={14} color={active === i ? '#fff' : C.primary} stroke={2} />
            {prompt.text}
          </Tap>
        ))}
      </div>
      <div style={{
        marginTop: 12, background: '#12383b', color: '#fff',
        borderRadius: 16, padding: '14px 14px 13px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.16,
          backgroundImage: 'radial-gradient(circle at center, rgba(255,248,240,0.75) 1px, transparent 1.6px)',
          backgroundSize: '15px 15px',
        }} />
        <div style={{ position: 'relative' }}>
          <div style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 21, letterSpacing: -0.25, lineHeight: 1.08 }}>
            {item.title}
          </div>
          <div style={{ fontFamily: FONTS.body, fontSize: 12.5, lineHeight: 1.45, color: 'rgba(255,248,240,0.82)', marginTop: 7 }}>
            {item.body}
          </div>
          <Tap onClick={() => onPlan(item.mood)} style={{
            marginTop: 12, display: 'inline-flex', alignItems: 'center', gap: 7,
            background: C.accent, color: '#fff',
            padding: '10px 14px', borderRadius: 12,
            fontFamily: FONTS.body, fontSize: 12.5, fontWeight: 800,
          }}>
            Make this plan
            <Icon name="arrowRight" size={13} color="#fff" stroke={2.3} />
          </Tap>
        </div>
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
  const [showSuggest, setShowSuggest] = useState(false)
  const [askIdx, setAskIdx] = useState(0)

  return (
    <div data-scroll-root style={{
      background: C.bg, height: '100%', overflowY: 'auto', overflowX: 'hidden',
      paddingBottom: 110,
    }}>
      <div style={{ padding: '54px 18px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <div style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 21, color: C.primary, letterSpacing: -0.3 }}>
            Chai &amp; Chill
          </div>
          <div style={{
            fontFamily: FONTS.body, fontSize: 10.5, fontWeight: 800,
            color: C.accent, background: 'rgba(181,38,25,0.08)',
            border: '1px solid rgba(181,38,25,0.14)',
            borderRadius: 999, padding: '6px 10px',
            letterSpacing: 0.4,
          }}>Bhopal only</div>
        </div>
        <div style={{
          background: '#fffdfa', borderRadius: 22,
          padding: 12, position: 'relative', overflow: 'hidden',
          boxShadow: '0 18px 44px rgba(0,101,119,0.12)',
          border: `1px solid ${C.border}`,
        }}>
          <BhopalScene />
          <div style={{ padding: '16px 8px 6px', position: 'relative' }}>
            <Enter delay={0} keyId="new-hero-label">
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontFamily: FONTS.body, fontSize: 10.5, fontWeight: 800,
                color: C.muted, letterSpacing: 1.35, textTransform: 'uppercase',
              }}>
                <Icon name="spark" size={13} color={C.accent} stroke={2.1} />
                57 handpicked Bhopal spots
              </div>
            </Enter>
            <Enter delay={100} keyId="new-hero-h">
              <div style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 33, lineHeight: 1.04, color: C.text, marginTop: 9, letterSpacing: '-0.5px' }}>
                Where should<br />we go tonight?
              </div>
            </Enter>
            <Enter delay={200} keyId="new-hero-sub">
              <div style={{ fontFamily: FONTS.body, fontSize: 13.5, lineHeight: 1.48, color: C.muted, marginTop: 10, maxWidth: 310 }}>
                Not endless listings. A calm, opinionated shortlist for dates, squads, solo evenings, and lake-side chai plans.
              </div>
            </Enter>
            <Enter delay={300} keyId="new-hero-btn">
              <Tap onClick={() => onNavigate('plan')} style={{
                marginTop: 18, display: 'inline-flex', alignItems: 'center', gap: 8,
                background: C.accent, color: '#fff',
                padding: '12px 18px', borderRadius: 14,
                fontFamily: FONTS.body, fontWeight: 800, fontSize: 13,
                boxShadow: '0 8px 18px rgba(181,38,25,0.24)',
              }}>
                Get a verdict
                <Icon name="arrowRight" size={14} color="#fff" stroke={2.2} />
              </Tap>
            </Enter>
          </div>
        </div>
        <AskCard
          active={askIdx}
          onPick={setAskIdx}
          onPlan={(mood) => onNavigate('mood', mood)}
        />
      </div>

      {/* Top bar */}
      <div style={{ display: 'none', padding: '62px 20px 8px', alignItems: 'center' }}>
        <div style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 20, color: C.primary, letterSpacing: -0.3 }}>
          Chai &amp; Chill
        </div>
      </div>

      {/* Hero card */}
      <div style={{ display: 'none', padding: '12px 20px 0' }}>
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
              <Tap onClick={() => onNavigate('plan')} style={{
                marginTop: 26, display: 'inline-flex', alignItems: 'center', gap: 8,
                background: C.accent, color: '#fff',
                padding: '13px 22px', borderRadius: 100,
                fontFamily: FONTS.body, fontWeight: 500, fontSize: 14,
                boxShadow: '0 6px 16px rgba(181,38,25,0.32)',
              }}>
                Plan tonight
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

      {/* Floating "+" button */}
      <Tap
        onClick={() => setShowSuggest(true)}
        scale={0.9}
        style={{
          position: 'fixed', bottom: 96, right: 20,
          width: 50, height: 50, borderRadius: 50,
          background: '#b52619',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(181,38,25,0.4)',
          zIndex: 40,
        }}
      >
        <span style={{ color: '#fff', fontSize: 26, lineHeight: 1, fontWeight: 300, marginTop: -1 }}>+</span>
      </Tap>

      {/* Suggest a spot sheet */}
      {showSuggest && <SuggestSheet onClose={() => setShowSuggest(false)} />}
    </div>
  )
}
