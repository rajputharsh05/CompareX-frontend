import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { 
  createBrowserRouter, 
  RouterProvider
 } from "react-router-dom"
import Result from './components/personal_results/PersonalResults.jsx'
import AuthPage from './components/auth/auth.jsx'
import Dashboard from './components/dashboard/Dashboard.jsx'

 const router = createBrowserRouter([
  {
    path : "/",
    element : <App></App>
  },{
    path : "/result",
    element : <Result></Result>
  },{
    path : "auth",
    element : <AuthPage></AuthPage>
  },{
    path : "dashboard",
    element : <Dashboard></Dashboard>
  }
 ])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
)
