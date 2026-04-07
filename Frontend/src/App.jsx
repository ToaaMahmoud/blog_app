import React from 'react'
import {Routes, Route} from 'react-router-dom'
import AuthPage from './pages/AuthPage'
import {Toaster} from 'react-hot-toast'
function App() {
  return (
    <div>
      <Toaster position='top-right'/>
      <Routes>
        <Route path='/auth' element={<AuthPage/>}></Route>
      </Routes>
    </div>
  )
}

export default App
