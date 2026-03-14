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
            background: '#1A1A1A',
            color: '#F8F6F2',
            fontFamily: 'Inter, sans-serif',
            borderRadius: '4px',
          },
          success: { iconTheme: { primary: '#C9A96E', secondary: '#F8F6F2' } },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>
)
