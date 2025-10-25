import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Voter from './pages/Voter'
import Admin from './pages/Admin'
import './styles.css'

function App(){
  return (
    <BrowserRouter>
      <div className="nav">
        <Link to="/">Voter</Link> | <Link to="/admin">Admin</Link>
      </div>
      <Routes>
        <Route path="/" element={<Voter/>} />
        <Route path="/admin" element={<Admin/>} />
      </Routes>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(<App />)
