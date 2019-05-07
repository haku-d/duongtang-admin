import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = props => {
  if (!props.isLogged) {
    return (
      <div className="container">
        <div className="row justify-content-center mg-bt-20">
          <nav className="navbar col-sm-6">
            <NavLink to="/" exact className="nav-item" activeClassName="active">
              Home
            </NavLink>
            <NavLink
              to="/register"
              exact
              className="nav-item"
              activeClassName="active"
            >
              Register
            </NavLink>
            <NavLink
              to="/login"
              exact
              className="nav-item"
              activeClassName="active"
            >
              Login
            </NavLink>
          </nav>
        </div>
      </div>
    )
  }
  return null
}

export default Navbar
