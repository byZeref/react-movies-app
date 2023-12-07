import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './assets/css/water-dark.css'
import './assets/css/index.css'
import 'react-toastify/dist/ReactToastify.css'
// import 'dotenv/config.js'

const app = ReactDOM.createRoot(document.getElementById('root'))

app.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
