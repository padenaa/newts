import { Link, Outlet } from 'react-router-dom'
import logo from './assets/NewtsRectangle.png'

import './App.css'


function AuthenticatedApp() {
  return (
    <>
      <div className="App" style={{overflowX: "hidden" }}>
      <header className="App-header">
        <nav className='navbar fixed-top navbar-expand-lg' style={{backgroundColor: "#F8FDF0"}}>

          <Link to={'/app'} className='navbar-brand mx-3'><img src={logo} style={{height: "50px"}}/></Link>
        
        {/**
          <ul className="navbar-nav d-flex flex-row me-1">
          <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="navbarDropdown" data-toggle="dropdown" aria-expanded="false" aria-haspopup="true" > 
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                </svg>
                </button>
                <div className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                  <a href='/sign-in' className="dropdown-item">Log out</a>
                </div>
            </div>
          </ul>
          */}

        </nav>
      </header>
      <Outlet />
    </div>
    </>
  )
}

export default AuthenticatedApp;
