import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Results from './pages/Results'
import Detail from './pages/Detail'
import Explore from './pages/Explore'
import Map from './pages/Map'
import Saved from './pages/Saved'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results/:mood" element={<Results />} />
        <Route path="/spot/:id" element={<Detail />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/map" element={<Map />} />
        <Route path="/saved" element={<Saved />} />
      </Routes>
    </BrowserRouter>
  )
}
