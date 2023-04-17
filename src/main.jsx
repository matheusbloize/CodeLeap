import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Error from './pages/Error/Error'
import Home from './pages/Home/Home'
import SignUp from './pages/SignUp/SignUp'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error/>,
    children: [
      {
        path: "/",
        element: <Home/>
      }, 
      {
        path: "/signup",
        element: <SignUp/>
      }
    ]

  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}>
    <App />
  </RouterProvider>
)
