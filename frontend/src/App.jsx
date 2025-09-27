import { BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import ProtectedRoute from "./api/protectedRoute"
import Login from "./pages/Login"
import Register from "./pages/Register"
import NotFount from "./pages/NotFount"
import { AuthProcess } from "./api/authenticate"
import 'bootstrap/dist/css/bootstrap.min.css';
import Logout from "./pages/Logout"
import Navbar from "./pages/Navbar"

function App() {
  return (
      <>
      <Navbar />
        <Routes>
          <Route path="/" element={<ProtectedRoute> <Home /> </ProtectedRoute>}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/logout" element={<Logout />}></Route>
          <Route path="*" element={<NotFount />}></Route>
        </Routes>
      </>
    
  )
  // '*' = any other route
}

export default App
