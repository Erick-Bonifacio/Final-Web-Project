import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Login from './components/Login'

const routes = createBrowserRouter([
  {
    path: '/',
    element : <Login /> 
  },
  {
    path: '/create-user',
    element : <CreateUser />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={routes}/>
)