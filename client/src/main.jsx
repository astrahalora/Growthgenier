import React from 'react'
import ReactDOM from 'react-dom/client'
import './App.scss'
import * as bootstrap from 'bootstrap'
import { router } from "./router";
import { RouterProvider } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
