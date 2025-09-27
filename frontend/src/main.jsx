import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProcess } from './api/authenticate.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  
  <BrowserRouter>
    <AuthProcess all_data={<App />} />
  </BrowserRouter>
  
)
