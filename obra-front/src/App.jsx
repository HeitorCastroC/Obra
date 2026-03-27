import { useState } from 'react'
import { useNavigate, Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'

function Nav({ onHome, onProfile }) {
  return (
      <nav className="nav">
        <div className="nav-logo" onClick={onHome}>Obra</div>
        <div className="nav-links">
          <span onClick={onHome}>feed</span>
          <span>explorar</span>
        </div>
        <div className="nav-user" onClick={onProfile}>
          <div className="avatar">H</div>
          <span>Heitor</span>
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
        <Nav onHome={() => navigate('/')} onProfile={() => navigate('/profile/1')} />
        <Routes>
          <Route path="/"            element={<Home />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
      </>
  )
}