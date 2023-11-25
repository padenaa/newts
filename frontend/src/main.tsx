import React from 'react'
import ReactDOM from 'react-dom/client'
import AuthenticatedApp from './AuthenticatedApp.tsx'
import Root from './Root.tsx'
import SignIn from './pages/SignIn.tsx'
import Map from './pages/MapPage.tsx'
import './index.css'
import { Route, createHashRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'

const router = createHashRouter(
  createRoutesFromElements(
    <Route path='/' element={<Root />}>
      <Route path='app' element={<AuthenticatedApp />}>
        <Route path='' element={<Map />} />
      </Route>
      <Route path='/' element={<SignIn />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
