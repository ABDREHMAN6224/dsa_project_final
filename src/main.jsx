import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AppProvider from './context/context.jsx'
import HeapProvider from './context/Heapctx.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <AppProvider>
      <HeapProvider>
    <App />
      </HeapProvider>
    </AppProvider>
  // </React.StrictMode>,
)
