import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
class Navbar extends React.Component {
  render() {
    if (!this.props.isLogged) {
      return (
        <React.Fragment>
          <div className="container">
            <div className="row justify-content-center mg-bt-20">
              <nav className="navbar col-sm-6">
                <NavLink
                  to="/"
                  exact
                  className="nav-item"
                  activeClassName="active"
                >
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
        </React.Fragment>
      )
    }
    return null
  }
}
// Validator values props
Navbar.propTypes = {
  isLogged: PropTypes.bool.isRequired
}
// Default propTypes
Navbar.defaultProps = {
  isLogged: false
}
export default Navbar
