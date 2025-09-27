import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../api/authenticate'

const Navbar = () => {
    const {loginUser, logoutUser, user}= useContext(AuthContext)

  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-primary">
        <Link className="navbar-brand ms-3" to='/'>NotesApp</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
            <li className="nav-item active">
                <Link className="nav-link" to='/'> Home </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to='/register'> Register </Link>
            </li>
            {
                user ? ( <li className="nav-item">
                            <button className="nav-link" onClick={logoutUser}>Logout</button>
                        </li>) : 
                        ( <li className="nav-item">
                            <Link className="nav-link" to='/login'>Login</Link>
                          </li> )
            }
            </ul>
        </div>
        </nav>
    </div>
  )
}

export default Navbar