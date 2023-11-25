import React from 'react'
import ReactDOM from 'react-dom/client'
import AuthenticatedApp from './AuthenticatedApp.tsx'
import Home from './Home.tsx'
import Root from './Root.tsx'
import SignIn from './pages/SignIn.tsx'
import Profile from './pages/Profile.tsx'
import Map from './pages/MapPage.tsx'
import './index.css'
import { Route, createHashRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'

const router = createHashRouter(
  createRoutesFromElements(
    <Route path='/' element={<Root />}>
      <Route path='app' element={<AuthenticatedApp />}>
        <Route path='' element={<Map />} />
        <Route path='profile' element={<Profile />} />
      </Route>
      <Route path='/' element={<Home />} />
      <Route path='sign-in' element={<SignIn />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
