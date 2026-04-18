import React from 'react'

export const C = {
  bg: '#fff8f0',
  primary: '#006577',
  accent: '#b52619',
  surface: '#f5ede3',
  text: '#1a1a1a',
  muted: '#8a7a6a',
  border: '#e8ddd0',
  shadowWarm: '0 4px 20px rgba(0,101,119,0.08), 0 1px 3px rgba(0,101,119,0.04)',
}

export const FONTS = {
  display: "'Playfair Display', Georgia, serif",
  body: "'DM Sans', system-ui, sans-serif",
}

export const Icon = ({ name, size = 22, color = 'currentColor', stroke = 1.8 }) => {
  const p = {
    width: size, height: size, viewBox: '0 0 24 24', fill: 'none',
    stroke: color, strokeWidth: stroke, strokeLinecap: 'round', strokeLinejoin: 'round',
  }
  const paths = {
    heart: <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>,
    coffee: <g><path d="M18 8h1a3 3 0 010 6h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 2v3M10 2v3M14 2v3"/></g>,
    rupee: <g><path d="M6 4h12M6 8h12M12 13L6 20M6 12h4a4 4 0 000-8"/></g>,
    users: <g><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></g>,
    camera: <g><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></g>,
    laptop: <g><rect x="2" y="4" width="20" height="12" rx="2"/><path d="M0 20h24"/></g>,
    bookmark: <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/>,
    bookmarkFill: <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" fill={color}/>,
    star: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>,
    starFill: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill={color}/>,
    pin: <g><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></g>,
    arrowLeft: <g><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></g>,
    arrowRight: <g><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></g>,
    search: <g><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></g>,
    sliders: <g><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></g>,
    map: <g><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></g>,
    home: <g><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2h-4v-7h-6v7H5a2 2 0 01-2-2z"/></g>,
    compass: <g><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></g>,
    clock: <g><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></g>,
    check: <polyline points="20 6 9 17 4 12"/>,
    close: <g><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></g>,
    share: <g><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></g>,
    leaf: <g><path d="M21 3c-5 0-10 3-13 8-2 3-3 7-3 10 3 0 7-1 10-3 5-3 8-8 8-13"/><path d="M5 21c3-3 6-5 9-7"/></g>,
    mountain: <polygon points="2 20 8 10 12 15 16 8 22 20"/>,
    sun: <g><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></g>,
    moon: <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>,
  }
  return <svg {...p}>{paths[name] || null}</svg>
}

export const SpotImage = ({ spot, moods, height = 180, rounded = 16, showSepia = false }) => {
  const mood = moods.find(m => m.id === spot.moodId) || moods[0]
  const letter = spot.name[0]
  return (
    <div style={{
      height, width: '100%', borderRadius: rounded, position: 'relative', overflow: 'hidden',
      background: mood.grad,
      filter: showSepia ? 'sepia(0.35) saturate(0.85) contrast(0.95)' : 'none',
    }}>
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.15,
        backgroundImage: `radial-gradient(${mood.accent} 1px, transparent 1px)`,
        backgroundSize: '14px 14px',
      }} />
      <div style={{
        position: 'absolute', inset: 0, display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        fontFamily: FONTS.display, fontWeight: 800, fontSize: height * 0.6,
        color: mood.accent, opacity: 0.75, letterSpacing: -4, lineHeight: 1,
      }}>{letter}</div>
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0, height: '30%',
        background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.06))',
      }} />
      {spot.legend && (
        <div style={{
          position: 'absolute', top: 12, left: 12,
          background: 'rgba(255,248,240,0.95)', color: C.primary,
          fontFamily: FONTS.body, fontSize: 10, fontWeight: 600,
          padding: '4px 10px', borderRadius: 100,
          letterSpacing: 1.2, textTransform: 'uppercase',
        }}>Bhopal Legend</div>
      )}
    </div>
  )
}

export const Rating = ({ value, size = 12 }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}>
    <Icon name="starFill" size={size} color="#c49a2a" />
    <span style={{ fontFamily: FONTS.body, fontWeight: 500, color: C.text }}>{value}</span>
  </span>
)

export const Tagline = ({ children }) => (
  <div style={{
    fontFamily: FONTS.display, fontStyle: 'italic', fontSize: 14,
    color: C.text, lineHeight: 1.4,
    borderLeft: `2px solid ${C.primary}`,
    paddingLeft: 10, paddingTop: 4, paddingBottom: 4, paddingRight: 6,
    background: 'rgba(0,101,119,0.04)',
    borderRadius: '0 6px 6px 0',
  }}>{children}</div>
)

export const Chip = ({ active, onClick, children, tone = 'teal', style: extraStyle }) => {
  const activeBg = tone === 'teal' ? C.primary : C.accent
  return (
    <button
      onClick={onClick}
      style={{
        all: 'unset', cursor: 'pointer',
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: '8px 14px', borderRadius: 100,
        border: active ? `1.5px solid ${activeBg}` : `1.5px solid ${C.border}`,
        background: active ? activeBg : 'transparent',
        color: active ? '#fff' : C.text,
        fontFamily: FONTS.body, fontSize: 13, fontWeight: 500,
        whiteSpace: 'nowrap',
        transition: 'transform 220ms cubic-bezier(0.34,1.56,0.64,1), background 200ms, color 200ms, border-color 200ms',
        ...extraStyle,
      }}
      onMouseDown={e => { e.currentTarget.style.transform = 'scale(0.96)' }}
      onMouseUp={e => { e.currentTarget.style.transform = 'scale(1)' }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
    >{children}</button>
  )
}

export const Tap = ({ onClick, children, scale = 0.96, style: extraStyle, as: Comp = 'div' }) => (
  <Comp
    onClick={onClick}
    onMouseDown={e => { e.currentTarget.style.transform = `scale(${scale})` }}
    onMouseUp={e => { e.currentTarget.style.transform = 'scale(1)' }}
    onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
    onTouchStart={e => { e.currentTarget.style.transform = `scale(${scale})` }}
    onTouchEnd={e => { e.currentTarget.style.transform = 'scale(1)' }}
    style={{
      cursor: 'pointer', userSelect: 'none',
      transition: 'transform 280ms cubic-bezier(0.34,1.56,0.64,1)',
      ...extraStyle,
    }}
  >{children}</Comp>
)

export const Reveal = ({ children, delay = 0, y = 24, style: extraStyle }) => {
  const ref = React.useRef(null)
  const [seen, setSeen] = React.useState(false)
  React.useEffect(() => {
    if (!ref.current) return
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { setSeen(true); io.disconnect() } })
    }, { threshold: 0.1, root: ref.current.closest('[data-scroll-root]') || null })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={ref} style={{
      opacity: seen ? 1 : 0,
      transform: seen ? 'translateY(0)' : `translateY(${y}px)`,
      transition: `opacity 600ms cubic-bezier(0.2,0.8,0.2,1) ${delay}ms, transform 700ms cubic-bezier(0.2,0.8,0.2,1) ${delay}ms`,
      ...extraStyle,
    }}>{children}</div>
  )
}

export const Enter = ({ children, delay = 0, y = 16, keyId = 'x', style: extraStyle }) => {
  const [on, setOn] = React.useState(false)
  React.useEffect(() => {
    setOn(false)
    const t = setTimeout(() => setOn(true), delay + 20)
    return () => clearTimeout(t)
  }, [keyId])
  return (
    <div style={{
      opacity: on ? 1 : 0,
      transform: on ? 'translateY(0)' : `translateY(${y}px)`,
      transition: 'opacity 560ms cubic-bezier(0.2,0.8,0.2,1), transform 640ms cubic-bezier(0.2,0.8,0.2,1)',
      ...extraStyle,
    }}>{children}</div>
  )
}

export const BookmarkBtn = ({ saved, onToggle, size = 36 }) => {
  const [pulse, setPulse] = React.useState(0)
  const handle = e => { e.stopPropagation(); setPulse(p => p + 1); onToggle() }
  return (
    <button key={pulse} onClick={handle} style={{
      all: 'unset', cursor: 'pointer',
      width: size, height: size, borderRadius: size,
      background: 'rgba(255,255,255,0.85)',
      backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      transition: 'transform 300ms cubic-bezier(0.34,1.56,0.64,1)',
    }}>
      <span style={{ display: 'inline-flex', animation: pulse ? 'bookmarkPop 420ms cubic-bezier(0.34,1.56,0.64,1)' : 'none' }}>
        <Icon name={saved ? 'bookmarkFill' : 'bookmark'} size={18} color={saved ? C.primary : C.muted} stroke={2} />
      </span>
    </button>
  )
}

export const SectionHeader = ({ children }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
    <div style={{ width: 3, height: 18, background: C.primary, borderRadius: 2, flexShrink: 0 }} />
    <div style={{
      fontFamily: FONTS.display, fontWeight: 700, fontSize: 18,
      color: C.text, letterSpacing: -0.2, whiteSpace: 'nowrap',
    }}>{children}</div>
  </div>
)
