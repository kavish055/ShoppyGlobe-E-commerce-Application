import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { StoreProvider } from './context/store.jsx'
import { Router } from './context/router.jsx'

createRoot(document.getElementById('root')).render(
  <StoreProvider>
  <Router>
    <App />
  </Router>
</StoreProvider>
,
)
