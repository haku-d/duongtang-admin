import React from 'react'
import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { logout } from 'reducers/MeReducer'

class LayoutSidebar extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="sidebar">
          <Link className="brand" to="/">
            DUONGTANG
          </Link>
          <nav className="nav">
            <NavLink
              exact
              className="sidebar-item"
              to="/"
              activeClassName="active"
            >
              Dashboard
            </NavLink>
            <NavLink
              exact
              className="sidebar-item"
              to="/users"
              activeClassName="active"
            >
              Users
            </NavLink>
          </nav>
          <div className="copy">
            <div className="user">
              <NavLink
                exact
                className="sidebar-item"
                to="/account/logout"
                activeClassName="active"
              >
                Logout
              </NavLink>
            </div>
            Copyright @2019, Clgt
          </div>
        </div>
      </React.Fragment>
    )
  }
}
const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  }
}
export default connect(
  null,
  mapDispatchToProps
)(LayoutSidebar)
