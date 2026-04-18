import L from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useNavigate } from 'react-router-dom'
import { spots } from '../data/spots'
import BottomNav from '../components/BottomNav'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

export default function Map() {
  const navigate = useNavigate()

  return (
    <div style={{ backgroundColor: '#fff8f0' }}>
      <div className="flex items-center px-4 pt-10 pb-3">
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '22px', fontWeight: 700, color: '#006577', margin: 0 }}>
          Bhopal Map
        </h1>
        <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#6b6b6b', marginLeft: '10px' }}>
          {spots.length} spots
        </span>
      </div>

      <MapContainer
        center={[23.2599, 77.4126]}
        zoom={12}
        style={{ height: 'calc(100vh - 120px)', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {spots.map((spot) => (
          <Marker key={spot.id} position={[spot.lat, spot.lng]}>
            <Popup>
              <div style={{ fontFamily: 'DM Sans, sans-serif', minWidth: '160px' }}>
                <p style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: '15px', margin: '0 0 4px', color: '#1a1a1a' }}>
                  {spot.name}
                </p>
                <p style={{ fontSize: '12px', color: '#6b6b6b', margin: '0 0 8px' }}>
                  {spot.area} · ★ {spot.rating}
                </p>
                <button
                  onClick={() => navigate(`/spot/${spot.id}`)}
                  style={{ backgroundColor: '#006577', color: '#fff', border: 'none', borderRadius: '6px', padding: '6px 14px', fontSize: '12px', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', fontWeight: 500 }}
                >
                  View Spot
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <BottomNav />
    </div>
  )
}
