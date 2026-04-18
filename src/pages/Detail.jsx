import { useState, useEffect } from 'react'
import { C, FONTS, Icon, Tagline, Tap, Enter, BookmarkBtn, SectionHeader } from '../ui/primitives.jsx'
import { MOODS } from '../data/adapted.js'

function InfoCell({ label, value }) {
  return (
    <div style={{ background: C.surface, borderRadius: 14, padding: '12px 14px' }}>
      <div style={{ fontFamily: FONTS.body, fontSize: 10.5, fontWeight: 600, color: C.muted, letterSpacing: 1, textTransform: 'uppercase' }}>
        {label}
      </div>
      <div style={{ fontFamily: FONTS.body, fontSize: 14, fontWeight: 500, color: C.text, marginTop: 4 }}>
        {value}
      </div>
    </div>
  )
}

export default function Detail({ spot, onBack, saved, toggleSave }) {
  const [slideUp, setSlideUp] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setSlideUp(false)
    const t = setTimeout(() => setSlideUp(true), 40)
    return () => clearTimeout(t)
  }, [spot?.id])

  const handleShare = async () => {
    const shareUrl = `https://chaichill.in/api/spot-meta?id=${spot.id}`
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${spot.name} — Chai & Chill`,
          text: spot.tagline,
          url: shareUrl,
        })
      } catch { /* user cancelled */ }
    } else {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (!spot) return null

  const mood = MOODS.find(m => m.id === spot.moodId) || MOODS[0]

  const mapsUrl = spot.placeId
    ? `https://www.google.com/maps/place/?q=place_id:${spot.placeId}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(spot.name + ' ' + spot.area + ' Bhopal')}`

  return (
    <div data-scroll-root style={{ background: C.bg, height: '100%', overflowY: 'auto', overflowX: 'hidden', position: 'relative' }}>

      {/* Full bleed image area */}
      <div style={{ height: 340, position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, background: mood.grad }}>
          <div style={{
            position: 'absolute', inset: 0, opacity: 0.14,
            backgroundImage: `radial-gradient(${mood.accent} 1px, transparent 1px)`,
            backgroundSize: '16px 16px',
          }} />
          <div style={{
            position: 'absolute', inset: 0, display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            fontFamily: FONTS.display, fontWeight: 800, fontSize: 220,
            color: mood.accent, opacity: 0.7, letterSpacing: -10, lineHeight: 1,
          }}>{spot.name[0]}</div>
        </div>
        <div style={{ position: 'absolute', top: 62, left: 20 }}>
          <Tap onClick={onBack} scale={0.9} style={{
            width: 40, height: 40, borderRadius: 100,
            background: 'rgba(255,248,240,0.9)',
            backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          }}>
            <Icon name="arrowLeft" size={18} color={C.primary} />
          </Tap>
        </div>
        <div style={{ position: 'absolute', top: 62, right: 20 }}>
          <BookmarkBtn saved={saved} onToggle={toggleSave} size={40} />
        </div>
      </div>

      {/* Content slides up */}
      <div style={{
        background: C.bg, borderRadius: '24px 24px 0 0',
        marginTop: -28, position: 'relative', zIndex: 2,
        padding: '20px 20px 120px',
        transform: slideUp ? 'translateY(0)' : 'translateY(40px)',
        opacity: slideUp ? 1 : 0,
        transition: 'transform 620ms cubic-bezier(0.2,0.9,0.2,1), opacity 480ms ease-out',
      }}>
        <Enter delay={100} keyId={`d-row-${spot.id}`}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              background: 'rgba(196,154,42,0.14)', color: '#8b6a1a',
              padding: '5px 10px', borderRadius: 100,
              fontFamily: FONTS.body, fontSize: 12, fontWeight: 600,
            }}>
              <Icon name="starFill" size={12} color="#c49a2a" /> {spot.rating}
            </div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              background: 'rgba(42,154,90,0.14)', color: '#1f6d41',
              padding: '5px 10px', borderRadius: 100,
              fontFamily: FONTS.body, fontSize: 12, fontWeight: 600,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: 6, background: '#2a9a5a' }} />
              {spot.reviews} reviews
            </div>
          </div>
        </Enter>

        <Enter delay={170} keyId={`d-area-${spot.id}`}>
          <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 5, fontFamily: FONTS.body, fontSize: 13, color: C.muted, fontWeight: 500 }}>
            <Icon name="pin" size={13} color={C.muted} stroke={1.8} /> {spot.area}
          </div>
        </Enter>

        <Enter delay={220} keyId={`d-name-${spot.id}`}>
          <div style={{ marginTop: 6, fontFamily: FONTS.display, fontWeight: 800, fontSize: 28, color: C.text, letterSpacing: -0.6, lineHeight: 1.1 }}>
            {spot.name}
          </div>
        </Enter>

        <Enter delay={280} keyId={`d-tag-${spot.id}`}>
          <div style={{ marginTop: 14 }}>
            <Tagline>{spot.tagline}</Tagline>
          </div>
        </Enter>

        <Enter delay={340} keyId={`d-grid-${spot.id}`}>
          <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <InfoCell label="Price" value={spot.price} />
            <InfoCell label="Diet" value={spot.diet} />
            <InfoCell label="Hours" value={spot.hours} />
            <InfoCell label="Budget" value={spot.budget} />
          </div>
        </Enter>

        <div style={{ marginTop: 24 }}>
          <SectionHeader>Must Try</SectionHeader>
          <div style={{ marginTop: 10, display: 'flex', gap: 8, overflowX: 'auto', scrollbarWidth: 'none', padding: '2px 0 4px' }}>
            {spot.mustTry.map(m => (
              <div key={m} style={{
                background: 'rgba(196,154,42,0.18)', color: '#7a5a12',
                fontFamily: FONTS.body, fontSize: 13, fontWeight: 500,
                padding: '8px 14px', borderRadius: 100, whiteSpace: 'nowrap',
                border: '1px solid rgba(196,154,42,0.3)',
              }}>{m}</div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 24 }}>
          <SectionHeader>Good For</SectionHeader>
          <div style={{ marginTop: 10, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {spot.tags.map(t => (
              <div key={t} style={{
                fontFamily: FONTS.body, fontSize: 13, fontWeight: 500,
                color: C.primary, background: 'rgba(0,101,119,0.08)',
                padding: '7px 14px', borderRadius: 100,
                border: '1px solid rgba(0,101,119,0.14)',
              }}>{t}</div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 28, display: 'flex', gap: 10 }}>
          {/* Share button */}
          <Tap onClick={handleShare} style={{
            flex: '0 0 auto',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
            padding: '16px 20px', borderRadius: 100,
            border: `1.5px solid ${C.primary}`,
            background: copied ? 'rgba(0,101,119,0.08)' : 'transparent',
            color: C.primary,
            fontFamily: FONTS.body, fontWeight: 500, fontSize: 15,
            transition: 'background 200ms',
            whiteSpace: 'nowrap',
          }}>
            <Icon name={copied ? 'check' : 'share'} size={16} color={C.primary} stroke={2} />
            {copied ? 'Copied!' : 'Share'}
          </Tap>

          {/* Maps button */}
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer" style={{
            flex: 1,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            background: C.primary, color: '#fff',
            padding: '16px 20px', borderRadius: 100,
            fontFamily: FONTS.body, fontWeight: 500, fontSize: 15,
            textDecoration: 'none',
            boxShadow: '0 10px 24px rgba(0,101,119,0.28)',
          }}>
            <Icon name="pin" size={16} color="#fff" stroke={2} />
            Open in Maps →
          </a>
        </div>
      </div>
    </div>
  )
}
