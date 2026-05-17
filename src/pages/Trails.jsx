import { useMemo, useState } from 'react'
import { C, FONTS, Icon, SpotImage, Tap, Reveal, BookmarkBtn } from '../ui/primitives.jsx'
import { MOODS } from '../data/adapted.js'
import { TRAILS, buildTrailShareText, getTrailStops } from '../data/trails.js'

function TrailPill({ trail, active, onClick }) {
  return (
    <Tap onClick={onClick} scale={0.94} style={{
      flexShrink: 0,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      minHeight: 38,
      padding: '0 13px',
      borderRadius: 13,
      background: active ? trail.color : '#fffdfa',
      color: active ? '#fff' : C.text,
      border: active ? `1px solid ${trail.color}` : `1px solid ${C.border}`,
      fontFamily: FONTS.body,
      fontSize: 12.5,
      fontWeight: 800,
      boxShadow: active ? '0 8px 18px rgba(0,101,119,0.14)' : 'none',
    }}>
      <span style={{
        width: 7,
        height: 7,
        borderRadius: 7,
        background: active ? '#fff' : trail.color,
      }} />
      {trail.shortName}
    </Tap>
  )
}

function TrailCard({ trail, active, onClick }) {
  const stops = getTrailStops(trail)
  return (
    <Tap onClick={onClick} scale={0.98} style={{
      minWidth: 238,
      width: 238,
      borderRadius: 18,
      padding: 14,
      background: active ? '#12383b' : '#fffdfa',
      color: active ? '#fff' : C.text,
      border: active ? '1px solid rgba(255,248,240,0.12)' : `1px solid ${C.border}`,
      boxShadow: active ? '0 14px 32px rgba(18,56,59,0.22)' : C.shadowWarm,
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        right: -24,
        top: -30,
        width: 104,
        height: 104,
        borderRadius: 104,
        background: trail.color,
        opacity: active ? 0.28 : 0.09,
      }} />
      <div style={{ position: 'relative' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 7,
          background: active ? 'rgba(255,248,240,0.12)' : 'rgba(0,101,119,0.07)',
          color: active ? 'rgba(255,248,240,0.84)' : C.primary,
          borderRadius: 999,
          padding: '5px 9px',
          fontFamily: FONTS.body,
          fontSize: 10.5,
          fontWeight: 900,
          letterSpacing: 1,
          textTransform: 'uppercase',
        }}>
          <span style={{ width: 6, height: 6, borderRadius: 6, background: trail.color }} />
          {trail.vibe}
        </div>
        <div style={{
          fontFamily: FONTS.display,
          fontWeight: 800,
          fontSize: 22,
          lineHeight: 1.05,
          letterSpacing: -0.35,
          marginTop: 10,
        }}>
          {trail.name}
        </div>
        <div style={{
          fontFamily: FONTS.body,
          fontSize: 12.5,
          lineHeight: 1.42,
          color: active ? 'rgba(255,248,240,0.78)' : C.muted,
          marginTop: 7,
        }}>
          {trail.line}
        </div>
        <div style={{
          display: 'flex',
          gap: 6,
          flexWrap: 'wrap',
          marginTop: 12,
        }}>
          {[trail.bestTime, trail.budget, `${stops.length} stops`].map(item => (
            <span key={item} style={{
              fontFamily: FONTS.body,
              fontSize: 10.5,
              fontWeight: 800,
              color: active ? '#faecc0' : '#8b6a1a',
              background: active ? 'rgba(250,236,192,0.12)' : 'rgba(196,154,42,0.12)',
              borderRadius: 999,
              padding: '5px 8px',
            }}>{item}</span>
          ))}
        </div>
      </div>
    </Tap>
  )
}

function SharePreview({ trail, onShare, copied }) {
  const stops = getTrailStops(trail)
  return (
    <div style={{
      background: '#12383b',
      color: '#fff',
      borderRadius: 22,
      padding: '18px 17px 16px',
      boxShadow: '0 18px 42px rgba(18,56,59,0.24)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.17,
        backgroundImage: 'radial-gradient(circle at center, rgba(255,248,240,0.72) 1px, transparent 1.6px)',
        backgroundSize: '15px 15px',
      }} />
      <div style={{
        position: 'absolute',
        right: -42,
        top: -52,
        width: 150,
        height: 150,
        borderRadius: 150,
        background: trail.color,
        opacity: 0.36,
      }} />
      <div style={{ position: 'relative' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
        }}>
          <div style={{
            fontFamily: FONTS.body,
            fontSize: 10,
            fontWeight: 900,
            letterSpacing: 1.4,
            textTransform: 'uppercase',
            color: 'rgba(255,248,240,0.72)',
          }}>
            Share card
          </div>
          <div style={{
            fontFamily: FONTS.body,
            fontSize: 10.5,
            fontWeight: 900,
            color: '#faecc0',
          }}>
            {stops.length} stops
          </div>
        </div>
        <div style={{
          fontFamily: FONTS.display,
          fontWeight: 800,
          fontSize: 31,
          lineHeight: 1.03,
          letterSpacing: -0.55,
          marginTop: 12,
        }}>
          {trail.name}
        </div>
        <div style={{
          fontFamily: FONTS.body,
          fontSize: 13,
          lineHeight: 1.42,
          color: 'rgba(255,248,240,0.82)',
          marginTop: 8,
        }}>
          {trail.line}
        </div>
        <div style={{
          marginTop: 14,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 8,
        }}>
          {[
            ['Best time', trail.bestTime],
            ['Budget', trail.budget],
            ['Area', trail.area],
            ['Duration', trail.duration],
          ].map(([label, value]) => (
            <div key={label} style={{
              background: 'rgba(255,248,240,0.1)',
              border: '1px solid rgba(255,248,240,0.13)',
              borderRadius: 13,
              padding: '8px 9px',
            }}>
              <div style={{
                fontFamily: FONTS.body,
                fontSize: 9.5,
                fontWeight: 900,
                letterSpacing: 1,
                textTransform: 'uppercase',
                color: 'rgba(255,248,240,0.52)',
              }}>
                {label}
              </div>
              <div style={{
                fontFamily: FONTS.body,
                fontSize: 12,
                fontWeight: 800,
                color: '#fff',
                marginTop: 2,
              }}>
                {value}
              </div>
            </div>
          ))}
        </div>
        <Tap onClick={onShare} style={{
          marginTop: 15,
          minHeight: 46,
          borderRadius: 14,
          background: C.accent,
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          fontFamily: FONTS.body,
          fontSize: 13.5,
          fontWeight: 900,
          boxShadow: '0 10px 20px rgba(181,38,25,0.22)',
        }}>
          <Icon name={copied === 'done' ? 'check' : 'share'} size={16} color="#fff" stroke={2.2} />
          {copied === 'done' ? 'Copied' : copied === 'blocked' ? 'Copy blocked' : 'Share trail'}
        </Tap>
      </div>
    </div>
  )
}

function StopCard({ spot, index, onOpen, saved, toggleSave }) {
  return (
    <Tap onClick={onOpen} scale={0.985} style={{
      background: '#fffdfa',
      border: `1px solid ${C.border}`,
      borderRadius: 17,
      padding: 10,
      boxShadow: C.shadowWarm,
      display: 'flex',
      gap: 12,
      alignItems: 'center',
    }}>
      <div style={{ width: 74, flexShrink: 0, position: 'relative' }}>
        <SpotImage spot={spot} moods={MOODS} height={74} rounded={13} />
        <div style={{
          position: 'absolute',
          left: -4,
          top: -4,
          width: 24,
          height: 24,
          borderRadius: 24,
          background: C.primary,
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: FONTS.body,
          fontSize: 11,
          fontWeight: 900,
          boxShadow: '0 4px 10px rgba(0,101,119,0.18)',
        }}>{index + 1}</div>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: FONTS.display,
          fontWeight: 800,
          fontSize: 18,
          lineHeight: 1.08,
          letterSpacing: -0.25,
          color: C.text,
        }}>
          {spot.name}
        </div>
        <div style={{
          fontFamily: FONTS.body,
          fontSize: 11.5,
          color: C.muted,
          marginTop: 4,
          lineHeight: 1.35,
        }}>
          {spot.area} | {spot.price} | {spot.bestTime}
        </div>
        <div style={{
          marginTop: 7,
          display: 'inline-flex',
          background: 'rgba(196,154,42,0.13)',
          color: '#8b6a1a',
          borderRadius: 999,
          padding: '4px 8px',
          fontFamily: FONTS.body,
          fontSize: 10.5,
          fontWeight: 800,
          maxWidth: '100%',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>
          Order: {spot.signatureOrder}
        </div>
      </div>
      <BookmarkBtn saved={saved} onToggle={toggleSave} size={34} />
    </Tap>
  )
}

export default function Trails({ initialTrailId, onOpenSpot, savedIds, toggleSave }) {
  const [selectedId, setSelectedId] = useState(initialTrailId || TRAILS[0].id)
  const [copied, setCopied] = useState('idle')
  const selectedTrail = useMemo(() => TRAILS.find(t => t.id === selectedId) || TRAILS[0], [selectedId])
  const stops = getTrailStops(selectedTrail)

  const shareTrail = async () => {
    const text = buildTrailShareText(selectedTrail)
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${selectedTrail.name} - Chai & Chill`,
          text,
          url: window.location.origin,
        })
        return
      } catch {
        // User cancelled native share. Keep copy fallback available.
      }
    }
    try {
      await navigator.clipboard.writeText(text)
      setCopied('done')
    } catch {
      setCopied('blocked')
    }
    setTimeout(() => setCopied('idle'), 1800)
  }

  return (
    <div data-scroll-root style={{
      background: 'linear-gradient(180deg, #fff8f0 0%, #fffdf8 48%, #f5ede3 100%)',
      height: '100%',
      overflowY: 'auto',
      overflowX: 'hidden',
      paddingBottom: 118,
    }}>
      <div style={{ padding: '54px 18px 0' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12 }}>
          <div>
            <div style={{
              fontFamily: FONTS.body,
              fontSize: 10.5,
              fontWeight: 900,
              color: C.accent,
              letterSpacing: 1.4,
              textTransform: 'uppercase',
            }}>
              Bhopal plans
            </div>
            <div style={{
              fontFamily: FONTS.display,
              fontWeight: 800,
              fontSize: 33,
              lineHeight: 1.02,
              color: C.text,
              letterSpacing: -0.65,
              marginTop: 5,
            }}>
              Trails worth sending.
            </div>
          </div>
          <div style={{
            flexShrink: 0,
            background: 'rgba(0,101,119,0.08)',
            color: C.primary,
            borderRadius: 13,
            padding: '8px 10px',
            fontFamily: FONTS.body,
            fontSize: 11,
            fontWeight: 900,
          }}>
            {TRAILS.length} trails
          </div>
        </div>
        <div style={{
          fontFamily: FONTS.body,
          fontSize: 13.5,
          lineHeight: 1.48,
          color: C.muted,
          marginTop: 10,
          maxWidth: 336,
        }}>
          Pick a ready-made route for the group chat: morning food runs, lake evenings, budget scenes, work cafes, and family-safe plans.
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', scrollbarWidth: 'none', padding: '18px 18px 3px' }}>
        {TRAILS.map(trail => (
          <TrailPill
            key={trail.id}
            trail={trail}
            active={trail.id === selectedTrail.id}
            onClick={() => setSelectedId(trail.id)}
          />
        ))}
      </div>

      <div style={{ display: 'flex', gap: 12, overflowX: 'auto', scrollbarWidth: 'none', padding: '12px 18px 2px' }}>
        {TRAILS.map((trail, index) => (
          <Reveal key={trail.id} delay={index * 40}>
            <TrailCard
              trail={trail}
              active={trail.id === selectedTrail.id}
              onClick={() => setSelectedId(trail.id)}
            />
          </Reveal>
        ))}
      </div>

      <div style={{ padding: '18px 18px 0' }}>
        <SharePreview trail={selectedTrail} onShare={shareTrail} copied={copied} />
      </div>

      <div style={{ padding: '24px 18px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 3, height: 18, background: selectedTrail.color, borderRadius: 2, flexShrink: 0 }} />
          <div style={{
            fontFamily: FONTS.display,
            fontWeight: 800,
            fontSize: 19,
            color: C.text,
            letterSpacing: -0.25,
          }}>
            Stops in order
          </div>
        </div>
        <div style={{
          fontFamily: FONTS.body,
          fontSize: 12.5,
          color: C.muted,
          lineHeight: 1.42,
          marginTop: 5,
          marginLeft: 13,
        }}>
          {selectedTrail.note}
        </div>
      </div>

      <div style={{ padding: '13px 18px 0', display: 'flex', flexDirection: 'column', gap: 11 }}>
        {stops.map((spot, index) => (
          <Reveal key={`${selectedTrail.id}-${spot.id}`} delay={index * 50}>
            <StopCard
              spot={spot}
              index={index}
              onOpen={() => onOpenSpot(spot)}
              saved={savedIds.includes(spot.id)}
              toggleSave={() => toggleSave(spot.id)}
            />
          </Reveal>
        ))}
      </div>
    </div>
  )
}
