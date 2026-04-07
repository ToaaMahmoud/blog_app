import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import AuthPage from './pages/AuthPage'
import {Toaster} from 'react-hot-toast'
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
      <Routes>
        <Route path="/" element={<Navigate to="/auth" />} />
        <Route path='/auth' element={<AuthPage/>}></Route>
      </Routes>
    </div>
  )
}

export default App
