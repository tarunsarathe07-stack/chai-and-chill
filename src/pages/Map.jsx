import { useState, useEffect, useRef } from 'react'
import L, { divIcon } from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { SPOTS } from '../data/adapted.js'
import { C, FONTS, Icon } from '../ui/primitives.jsx'

const MOOD_COLORS = {
  date: '#e85d75', solo: '#4a6fa5', budget: '#c49a2a',
  friends: '#2a9a5a', instagram: '#9a4ac4', work: '#2a8aaa',
  legendary: '#b52619', nature: '#2a9a5a', premium: '#006577',
  late_night: '#4a3a8a', rooftop: '#c49a2a', scenic: '#2a8aaa',
  default: '#006577',
}

const createPin = (spot) => {
  const color = MOOD_COLORS[spot.moods[0]] || MOOD_COLORS.default
  const initial = spot.name[0].toUpperCase()
  return divIcon({
    className: '',
    html: `<div style="width:36px;height:36px;background:${color};border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:2.5px solid white;box-shadow:0 3px 10px rgba(0,0,0,0.25);display:flex;align-items:center;justify-content:center;"><span style="transform:rotate(45deg);color:white;font-weight:700;font-size:13px;font-family:'Playfair Display',serif;">${initial}</span></div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -38],
  })
}

const userPin = divIcon({
  className: '',
  html: `<div style="width:14px;height:14px;background:#006577;border-radius:50%;border:2.5px solid white;box-shadow:0 0 0 4px rgba(0,101,119,0.2);animation:locationPulse 2s ease-in-out infinite;"></div>`,
  iconSize: [14, 14],
  iconAnchor: [7, 7],
})

function PanTo({ position }) {
  const map = useMap()
  useEffect(() => {
    if (position) map.flyTo([position.lat, position.lng], 14, { duration: 1.2 })
  }, [position, map])
  return null
}

export default function MapPage({ onOpenSpot }) {
  const [userLocation, setUserLocation] = useState(null)
  const [nearbySpots, setNearbySpots] = useState([])
  const [locationError, setLocationError] = useState(null)
  const [loadingLocation, setLoadingLocation] = useState(false)
  const [focusedSpot, setFocusedSpot] = useState(null)
  const mapRef = useRef(null)

  const getLocation = () => {
    setLoadingLocation(true)
    setLocationError(null)
    if (!navigator.geolocation) {
      setLocationError('Location not supported')
      setLoadingLocation(false)
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords
        setUserLocation({ lat: latitude, lng: longitude })
        const withDistance = SPOTS.map(spot => {
          const R = 6371
          const dLat = (spot.lat - latitude) * Math.PI / 180
          const dLng = (spot.lng - longitude) * Math.PI / 180
          const a = Math.sin(dLat / 2) ** 2 +
            Math.cos(latitude * Math.PI / 180) * Math.cos(spot.lat * Math.PI / 180) *
            Math.sin(dLng / 2) ** 2
          const distance = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
          return { ...spot, distance }
        })
        setNearbySpots(withDistance.filter(s => s.distance <= 10).sort((a, b) => a.distance - b.distance))
        setLoadingLocation(false)
      },
      () => {
        setLocationError('Location access denied')
        setLoadingLocation(false)
      },
      { timeout: 8000 }
    )
  }

  useEffect(() => { getLocation() }, [])

  return (
    <div style={{ background: C.bg, height: '100%', display: 'flex', flexDirection: 'column' }}>

      {/* Header */}
      <div style={{ padding: '62px 20px 12px' }}>
        <div style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 22, color: C.text, letterSpacing: -0.3 }}>
          Map
        </div>
        <div style={{ fontFamily: FONTS.body, fontSize: 13, color: C.muted, marginTop: 2 }}>
          {SPOTS.length} spots across Bhopal
        </div>
      </div>

      {/* Map */}
      <div style={{ flex: 1, position: 'relative' }}>
        <MapContainer
          center={[23.2599, 77.4126]}
          zoom={12}
          style={{ height: 'calc(100vh - 200px)', width: '100%' }}
          ref={mapRef}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors &copy; CARTO'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />
          {userLocation && <PanTo position={userLocation} />}
          {userLocation && (
            <Marker position={[userLocation.lat, userLocation.lng]} icon={userPin} />
          )}
          {SPOTS.map(spot => (
            <Marker key={spot.id} position={[spot.lat, spot.lng]} icon={createPin(spot)}>
              <Popup>
                <div style={{ fontFamily: FONTS.body, minWidth: 170 }}>
                  <div style={{ fontFamily: FONTS.display, fontWeight: 600, fontSize: 15, color: '#1a1a1a', marginBottom: 3 }}>
                    {spot.name}
                  </div>
                  <div style={{ fontSize: 12, color: '#8a7a6a', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
                    {spot.area}
                    <span>·</span>
                    <span style={{ color: '#c49a2a' }}>★</span> {spot.rating}
                  </div>
                  <button
                    onClick={() => onOpenSpot(spot)}
                    style={{
                      all: 'unset', cursor: 'pointer',
                      fontFamily: FONTS.body, fontSize: 13, fontWeight: 500,
                      color: C.primary, display: 'inline-flex', alignItems: 'center', gap: 4,
                    }}
                  >
                    View Spot →
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Bottom sheet */}
      <div style={{
        background: 'rgba(255,248,240,0.96)',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        borderTop: '1px solid rgba(0,101,119,0.08)',
        padding: '12px 20px 100px',
        minHeight: 70,
      }}>
        {loadingLocation && (
          <div style={{ fontFamily: FONTS.body, fontSize: 13, color: C.muted, display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', border: `2px solid ${C.primary}`, borderTopColor: 'transparent', animation: 'spin 0.8s linear infinite' }} />
            Finding your location…
          </div>
        )}
        {!loadingLocation && userLocation && nearbySpots.length > 0 && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <span style={{ fontFamily: FONTS.body, fontSize: 10, fontWeight: 600, color: C.primary, letterSpacing: 1.2, textTransform: 'uppercase' }}>Nearby</span>
              <span style={{ fontFamily: FONTS.body, fontSize: 12, color: C.muted }}>{nearbySpots.length} spots within 10 km</span>
            </div>
            <div style={{ display: 'flex', gap: 8, overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: 2 }}>
              {nearbySpots.map(s => (
                <button
                  key={s.id}
                  onClick={() => onOpenSpot(s)}
                  style={{
                    all: 'unset', cursor: 'pointer', flexShrink: 0,
                    background: '#fff', border: `1.5px solid ${C.border}`,
                    borderRadius: 100, padding: '7px 14px',
                    fontFamily: FONTS.body, fontSize: 12, fontWeight: 500, color: C.text,
                    whiteSpace: 'nowrap',
                    boxShadow: '0 1px 4px rgba(0,101,119,0.06)',
                  }}
                >
                  {s.name} · <span style={{ color: C.muted }}>{s.distance.toFixed(1)} km</span>
                </button>
              ))}
            </div>
          </>
        )}
        {!loadingLocation && locationError && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontFamily: FONTS.body, fontSize: 13, color: C.muted }}>
              Enable location to see nearby spots
            </span>
            <button
              onClick={getLocation}
              style={{ all: 'unset', cursor: 'pointer', fontFamily: FONTS.body, fontSize: 12, color: C.primary, fontWeight: 500 }}
            >
              Try again
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
