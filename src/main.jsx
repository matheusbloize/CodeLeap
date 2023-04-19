import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// router
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Error from './pages/Error/Error'
import Home from './pages/Home/Home'
import SignUp from './pages/SignUp/SignUp'
import MainScreen from './pages/MainScreen/MainScreen'

// redux
import { Provider } from 'react-redux'
import store from './redux/store'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/signup",
        element: <SignUp />
      },
      {
        path: "/main",
        element: <MainScreen />
      }
    ]

  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </Provider>
)
