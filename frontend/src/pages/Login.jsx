import React, { useContext } from 'react'
import AuthContext from '../api/authenticate'
import { Link } from 'react-router-dom'

const Login= () => {

  const {loginUser}= useContext(AuthContext)
  const handleSubmit= (e)=> {
    e.preventDefault()
    const email= e.target.email.value
    const password= e.target.password.value

    email.length > 0 && loginUser(email, password)
    console.log(email)
    console.log(password)
  }

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center bg-light">
      
      <div 
        className="card shadow-lg p-4 p-md-5 rounded-3 w-100" 
        style={{ maxWidth: '450px' }}
      >
        <div className="card-body">
          
          <div className="mb-5">
            <h3 className="text-center fw-bold text-dark mb-2">
              Sign in to your account
            </h3>
            <p className="text-center text-muted">
              Welcome back!
            </p>
          </div>
          
          <form onSubmit={handleSubmit}>
            
            <div className="form-group mb-3">
              <label htmlFor="email-address" className="form-label visually-hidden">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                className="form-control form-control-lg"
                placeholder="Email address"
                
              />
            </div>
            
            <div className="form-group mb-4">
              <label htmlFor="password" className="form-label visually-hidden">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="form-control form-control-lg"
                placeholder="Password"
              />
            </div>

            <div className="d-grid mb-4">
              <button
                type="submit"
                className="btn btn-primary btn-lg shadow-sm" 
              >
                Sign in
              </button>
            </div>

            <div className="text-center">
              <p className="text-muted mb-0">
                Don't have an account? <Link to="/register">Register now</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login