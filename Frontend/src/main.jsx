import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import UserContext from './context/userContext.jsx'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import CaptainContext from './context/captainContext.jsx'
import SocketProvider from './context/socketContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SocketProvider>
      <CaptainContext>
        <UserContext>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </UserContext>
      </CaptainContext>
    </SocketProvider>
  </StrictMode>,
)
