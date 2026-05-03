import { useState, useEffect } from 'react'
import Home from './pages/Home.jsx'
import Results from './pages/Results.jsx'
import Detail from './pages/Detail.jsx'
import Explore from './pages/Explore.jsx'
import MapPage from './pages/Map.jsx'
import Saved from './pages/Saved.jsx'
import Plan from './pages/Plan.jsx'
import BottomNav from './components/BottomNav.jsx'
import { SPOTS } from './data/adapted.js'

const getInitialStack = () => {
  const match = window.location.pathname.match(/^\/spot\/(\d+)/)
  if (!match) return [{ screen: 'vibes' }]
  const spot = SPOTS.find(s => s.id === Number(match[1]))
  return spot ? [{ screen: 'vibes' }, { screen: 'detail', data: spot }] : [{ screen: 'vibes' }]
}

export default function App() {
  const [tab, setTab] = useState('vibes')
  const [stack, setStack] = useState(getInitialStack)
  const [savedIds, setSavedIds] = useState(() => {
    try { return JSON.parse(localStorage.getItem('cc_saved') || '[]') } catch { return [] }
  })
  const [transition, setTransition] = useState(0)
  const [direction, setDirection] = useState('forward')
  const [bawaTipIdx, setBawaTipIdx] = useState(0)

  useEffect(() => {
    localStorage.setItem('cc_saved', JSON.stringify(savedIds))
  }, [savedIds])

  useEffect(() => {
    const interval = setInterval(() => setBawaTipIdx(i => i + 1), 8000)
    return () => clearInterval(interval)
  }, [])

  const toggleSave = id => {
    setSavedIds(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id])
  }

  const push = (screen, data) => {
    setDirection('forward')
    setStack(st => [...st, { screen, data }])
    setTransition(t => t + 1)
    if (screen === 'detail' && data?.id) window.history.replaceState(null, '', `/spot/${data.id}`)
  }

  const pop = () => {
    setDirection('back')
    setStack(st => st.length > 1 ? st.slice(0, -1) : st)
    setTransition(t => t + 1)
    window.history.replaceState(null, '', '/')
  }

  const switchTab = id => {
    setDirection('forward')
    setTab(id)
    setStack([{ screen: id }])
    setTransition(t => t + 1)
    window.history.replaceState(null, '', '/')
  }

  const navigate = (target, data) => {
    if (target === 'explore') switchTab('explore')
    else if (target === 'plan') switchTab('plan')
    else if (target === 'mood') push('mood', data)
    else if (target === 'detail') push('detail', data)
  }

  const openSpot = spot => push('detail', spot)

  const top = stack[stack.length - 1]
  const showNav = top.screen !== 'detail'

  let screen = null
  if (top.screen === 'vibes') {
    screen = (
      <Home
        onNavigate={navigate}
        onOpenSpot={openSpot}
        savedIds={savedIds}
        toggleSave={toggleSave}
        bawaTipIdx={bawaTipIdx}
      />
    )
  } else if (top.screen === 'explore') {
    screen = <Explore onOpenSpot={openSpot} savedIds={savedIds} toggleSave={toggleSave} />
  } else if (top.screen === 'plan') {
    screen = <Plan onOpenSpot={openSpot} savedIds={savedIds} toggleSave={toggleSave} />
  } else if (top.screen === 'map') {
    screen = <MapPage onOpenSpot={openSpot} />
  } else if (top.screen === 'saved') {
    screen = <Saved onOpenSpot={openSpot} savedIds={savedIds} toggleSave={toggleSave} onNavigate={switchTab} />
  } else if (top.screen === 'mood') {
    screen = (
      <Results
        moodId={top.data}
        onBack={pop}
        onOpenSpot={openSpot}
        savedIds={savedIds}
        toggleSave={toggleSave}
      />
    )
  } else if (top.screen === 'detail') {
    screen = (
      <Detail
        spot={top.data}
        onBack={pop}
        saved={savedIds.includes(top.data?.id)}
        toggleSave={() => toggleSave(top.data?.id)}
      />
    )
  }

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <div key={transition} style={{
        width: '100%', height: '100%', position: 'absolute', inset: 0,
        animation: direction === 'forward'
          ? 'pageForward 420ms cubic-bezier(0.2,0.8,0.2,1) both'
          : 'pageBack 380ms cubic-bezier(0.2,0.8,0.2,1) both',
      }}>
        {screen}
      </div>
      {showNav && <BottomNav active={tab} onChange={switchTab} />}
    </div>
  )
}
