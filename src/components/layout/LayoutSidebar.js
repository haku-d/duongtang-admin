import React from 'react'
import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { logout } from 'reducers/UserReducer'

class LayoutSidebar extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="sidebar">
          <Link className="brand" to="/dashboard">
            DUONGTANG
          </Link>
          <nav className="nav">
            <NavLink
              exact
              className="sidebar-item"
              to="/dashboard"
              activeClassName="active"
            >
              Dashboard
            </NavLink>
            <NavLink
              exact
              className="sidebar-item"
              to="/list-link-drive"
              activeClassName="active"
            >
              List Link Google Drive
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
              <button
                className="logout"
                onClick={() => {
                  this.props.logout()
                }}
              >
                Log out
              </button>
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
