import { useContext } from "react"
import AuthContext from "../api/authenticate"
import { useState } from "react"
import { Link } from "react-router-dom"

const Register= () => {

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")

    const {registerUser} = useContext(AuthContext)
    
    const handleSubmit = async e => {
    e.preventDefault()
    registerUser(username, email, password, password2)
    }

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center bg-light">
          
          <div 
            className="card shadow-lg p-4 p-md-5 rounded-3 w-100 mt-5" 
            style={{ maxWidth: '450px' }}
          >
            <div className="card-body">
              
              <div className="mb-5">
                <h3 className="text-center fw-bold text-dark mb-2">
                  Sign Up Form
                </h3>
                
              </div>
              
              <form onSubmit={handleSubmit}>

                <div className="form-group mb-3">
                  <label htmlFor="username" className="form-label visually-hidden">
                    Username
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="form-control form-control-lg"
                    placeholder="Username"
                    onChange={e => setUsername(e.target.value)}
                  />
                </div>
                
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
                    onChange={e => setEmail(e.target.value)}
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
                    onChange={(e)=> setPassword(e.target.value)}
                  />
                </div>

                <div className="form-group mb-4">
                  <label htmlFor="password2" className="form-label visually-hidden">
                    Password
                  </label>
                  <input
                    id="password2"
                    name="password2"
                    type="password"
                    required
                    className="form-control form-control-lg"
                    placeholder="Confirm Password"
                    onChange={(e)=> setPassword2(e.target.value)}
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
                    Already have an account? <Link to="/login">Login now</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
  )
}



export default Register
