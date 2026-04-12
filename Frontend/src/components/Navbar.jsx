import React from 'react'
import { Link, useNavigate } from 'react-router-dom'


function Navbar() {
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user'))

    const handleLogOut = () => {
        localStorage.clear()
        navigate('/auth')
    }

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <Link to='/' className="text-xl font-bold">Ink</Link>
            </div>
            <div className="navbar-end">
                {user ? (
                    <>
                        <h1>Hi, {user.name}</h1>
                        <button onClick={handleLogOut} className="btn">Logout</button>
                    </>
                ) : (
                    <Link to="/auth" className="btn">Login</Link>
                )}
            </div>
        </div>
    )
}

export default Navbar
