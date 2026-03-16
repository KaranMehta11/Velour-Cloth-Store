import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#0A0A0A',
            color: '#FDFCFA',
            fontFamily: '"Jost", sans-serif',
            borderRadius: '0px',
          },
          success: { iconTheme: { primary: '#B8963E', secondary: '#FDFCFA' } },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>
)
