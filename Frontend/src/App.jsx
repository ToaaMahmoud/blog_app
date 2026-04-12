import React from 'react'
import {Routes, Route, Outlet} from 'react-router-dom'
import AuthPage from './pages/AuthPage'
import {Toaster} from 'react-hot-toast'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import UserPostsPage from './pages/UserPostsPage'

  function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}
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
        <Route element={<MainLayout/>}>
        <Route path="/" element={<HomePage />} />
        <Route path="/user-posts" element={<UserPostsPage />} />
        </Route>

        <Route path='/auth' element={<AuthPage/>}/>
      </Routes>
    </div>
  )
}

export default App
