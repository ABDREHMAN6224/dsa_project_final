import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AppProvider from './context/context.jsx'
import HeapProvider from './context/Heapctx.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TreeProvider from './context/TreeContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <>
    <ToastContainer position='top-right' autoClose={3000} closeOnClick theme='dark' pauseOnHover/>
    <AppProvider>
      <HeapProvider>
        <TreeProvider>
    <App />
        </TreeProvider>
      </HeapProvider>
    </AppProvider>
  </>
  // </React.StrictMode>,
)
