import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import AuthPage from './pages/AuthPage'
import {Toaster} from 'react-hot-toast'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
function App() {
  return (
    <div>
      <Toaster 
        position='top-right' 
        toastOptions={{
            style: {
                background: '#1a1a1a',
                color: '#fff',
                borderRadius: '4px',
                fontSize: '14px',
            }
        }}
      />
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/auth' element={<AuthPage/>}></Route>
      </Routes>
    </div>
  )
}

export default App
