import React from 'react'
import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import BlockUi from 'react-block-ui'

class Sidebar extends React.Component {
  render() {
    if (this.props.app.isLogged === false) return <span />

    return (
      <React.Fragment>
        <div className="sidebar">
          <BlockUi blocking={this.props.ui.isLoading}>
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
              <NavLink
                exact
                className="sidebar-item"
                to="/streams"
                activeClassName="active"
              >
                Streams
              </NavLink>
              <NavLink
                exact
                className="sidebar-item"
                to="/reports"
                activeClassName="active"
              >
                Reports
              </NavLink>
              <NavLink
                exact
                className="sidebar-item"
                to="/account/change-password"
              >
                Change password
              </NavLink>
            </nav>
            <div className="copy">
              <NavLink
                exact
                className="sidebar-item user"
                to="/account/logout"
                activeClassName="active"
              >
                Logout
              </NavLink>
              Copyright @2019, Clgt
            </div>
          </BlockUi>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    ui: state.ui,
    app: state.app
  }
}
export default connect(
  mapStateToProps,
  null
)(Sidebar)
