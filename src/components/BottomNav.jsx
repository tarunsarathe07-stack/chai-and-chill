import { Tap, Icon, FONTS, C } from '../ui/primitives.jsx'

const tabs = [
  { id: 'vibes',   label: 'Vibes',   icon: 'home' },
  { id: 'explore', label: 'Explore', icon: 'compass' },
  { id: 'map',     label: 'Map',     icon: 'map' },
  { id: 'saved',   label: 'Saved',   icon: 'bookmark' },
]

export default function BottomNav({ active, onChange }) {
  const idx = Math.max(0, tabs.findIndex(t => t.id === active))
  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 30,
      background: 'rgba(255,248,240,0.88)',
      backdropFilter: 'blur(18px) saturate(180%)',
      WebkitBackdropFilter: 'blur(18px) saturate(180%)',
      borderTop: '1px solid rgba(0,101,119,0.08)',
      paddingBottom: 22,
    }}>
      <div style={{
        position: 'relative',
        display: 'grid', gridTemplateColumns: `repeat(${tabs.length}, 1fr)`,
        padding: '10px 8px 6px',
      }}>
        {/* Sliding pill */}
        <div style={{
          position: 'absolute', top: 8, height: 48,
          width: `calc(${100 / tabs.length}% - 16px)`,
          left: `calc(${(idx * 100) / tabs.length}% + 8px)`,
          background: 'rgba(0,101,119,0.08)',
          borderRadius: 16,
          transition: 'left 480ms cubic-bezier(0.34,1.56,0.64,1)',
        }} />
        {tabs.map((t, i) => {
          const on = i === idx
          return (
            <Tap key={t.id} onClick={() => onChange(t.id)} scale={0.92} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              padding: '6px 0 4px', position: 'relative', zIndex: 1,
            }}>
              <div style={{
                display: 'inline-flex', position: 'relative',
                animation: on ? 'navBounce 520ms cubic-bezier(0.34,1.56,0.64,1)' : 'none',
              }} key={`${t.id}-${on}`}>
                <Icon name={t.icon} size={22} color={on ? C.primary : C.muted} stroke={on ? 2 : 1.8} />
              </div>
              <span style={{
                fontFamily: FONTS.body, fontSize: 10.5, fontWeight: on ? 600 : 500,
                color: on ? C.primary : C.muted, marginTop: 4, letterSpacing: 0.1,
              }}>{t.label}</span>
              <div style={{
                width: 4, height: 4, borderRadius: 4,
                background: C.primary, marginTop: 3,
                opacity: on ? 1 : 0,
                transform: on ? 'scale(1)' : 'scale(0.4)',
                transition: 'opacity 280ms, transform 360ms cubic-bezier(0.34,1.56,0.64,1)',
              }} />
            </Tap>
          )
        })}
      </div>
    </div>
  )
}
