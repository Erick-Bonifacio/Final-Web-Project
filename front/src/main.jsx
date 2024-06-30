import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Login from './components/Login.jsx'
import CreateUser from './components/CreateUser.jsx'
import ListAssets from './components/ListAssets.jsx'
import DeleteUser from './components/DeleteUser.jsx'

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
  },
  {
    path: '/delete-user',
    element: <DeleteUser />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={routes}/>
)