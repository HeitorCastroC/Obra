import { useNavigate, Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Explore from './pages/Explore'

// Placeholder for the authenticated user — replace with a real auth hook/context later
const CURRENT_USER = { id: 1, name: 'Heitor' }

function Nav({ onHome, onProfile, onExplorar }) {
  const initials = CURRENT_USER.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
      <nav className="nav">
        <div className="nav-logo" onClick={onHome}>Obra</div>
        <div className="nav-links">
          <span onClick={onHome}>feed</span>
          <span onClick={onExplorar}>explorar</span>
        </div>
        <div className="nav-user" onClick={onProfile}>
          <div className="avatar">{initials}</div>
          <span>{CURRENT_USER.name}</span>
        </div>
      </nav>
  )
}

export default function App() {
  return (
      <BrowserRouter>
        <AppInner />
      </BrowserRouter>
  )
}

function AppInner() {
  const navigate = useNavigate()
  return (
      <>
        <Nav onHome={() => navigate('/')} onProfile={() => navigate(`/profile/${CURRENT_USER.id}`)} onExplorar={() => navigate('/explorar')} />
        <Routes>
          <Route path="/"            element={<Home />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/explorar"    element={<Explore />} />
        </Routes>
      </>
  )
}