import React from 'react'
import { Routes, Route, Outlet, Navigate } from 'react-router-dom'
import AuthPage from './pages/AuthPage'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import UserPostsPage from './pages/UserPostsPage'
import AddPostPage from './pages/AddPostPage';
import PageDetailPage from './pages/PageDetailPage'

  function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

function RequireAuth() {
  const token = localStorage.getItem('accessToken');
  return token ? <MainLayout /> : <Navigate to="/auth" replace />;
}

function RedirectIfAuthenticated() {
  const token = localStorage.getItem('accessToken');
  return token ? <Navigate to="/" replace /> : <AuthPage />;
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
        <Route element={<RequireAuth />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/user-posts" element={<UserPostsPage />} />
          <Route path="/posts/new" element={<AddPostPage />} />
          <Route path='/posts/edit/:id' element={<AddPostPage />} />
          <Route path="/posts/:id" element={<PageDetailPage />} />
        </Route>

        <Route path='/auth' element={<RedirectIfAuthenticated />} />
      </Routes>
    </div>
  )
}

export default App
