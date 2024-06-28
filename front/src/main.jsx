import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Login from './components/Login.jsx'
import CreateUser from './components/CreateUser.jsx'
import ListAssets from './components/ListAssets.jsx'

const routes = createBrowserRouter([
  {
    path: '/',
    element : <Login /> 
  },
  {
    path: '/create-user',
    element : <CreateUser />
  },
  {
    path: '/list-assets',
    element: <ListAssets /> 
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={routes}/>
)