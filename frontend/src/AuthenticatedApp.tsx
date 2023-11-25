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
          <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNavDropdown' aria-controls='navbarNavDropdown' aria-expanded='false' aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarNavDropdown'>
            <ul className='navbar-nav'>
              <li className='nav-item'>
                <Link to={'/app'} className='nav-link'>Home</Link>
              </li>
              <li className='nav-item'>
                <Link to={'/app/profile'} className='nav-link'>Profile</Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      <Outlet />
    </div>
    </>
  )
}

export default AuthenticatedApp;
