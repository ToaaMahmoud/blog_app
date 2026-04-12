import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user'))

    const handleLogout = () => {
        localStorage.clear()
        navigate('/auth')
    }

    return (
        <div className="navbar bg-base-100 shadow-sm px-6">
            <div className="navbar-start">
                <Link to='/' className="text-xl font-black">Ink</Link>
            </div>
            <div className="navbar-center">
                {user && <Link to="/user-posts" className="text-sm font-medium text-gray-600 hover:text-neutral-900">My Posts</Link>}
            </div>
            <div className="navbar-end flex items-center gap-4">
                {user ? (
                    <>
                        <span className="text-sm text-gray-600">Hi, {user.name}</span>
                        <button onClick={handleLogout} className="btn btn-sm bg-neutral-900 text-white hover:bg-neutral-700">Logout</button>
                    </>
                ) : (
                    <Link to="/auth" className="btn btn-sm bg-neutral-900 text-white hover:bg-neutral-700">Login</Link>
                )}
            </div>
        </div>
    )
}

export default Navbar