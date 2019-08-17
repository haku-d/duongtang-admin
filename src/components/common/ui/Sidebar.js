import React from 'react'
import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import BlockUi from 'react-block-ui'

class Sidebar extends React.Component {
  constructor(porps) {
    super(porps)
    this.state = {
      isOpen: '',
      isArrow: '>'
    }
    this.handeleOpen = this.handeleOpen.bind(this)
  }
  handeleOpen() {
    if (this.state.isOpen === 'open') {
      this.setState({
        isOpen: '',
        isArrow: '>'
      })
    } else {
      this.setState({
        isOpen: 'open',
        isArrow: '<'
      })
    }
  }
  render() {
    if (this.props.app.isLogged === false) return <span />

    return (
      <React.Fragment>
        <div className={`sidebar ${this.state.isOpen}`}>
          <button
            className="btn btn-outline-secondary nav-toggle"
            onClick={this.handeleOpen}
          >
            {this.state.isArrow}
          </button>
          <div className="sidebar-fixed">
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
                  onClick={this.handeleOpen}
                >
                  Dashboard
                </NavLink>
                <NavLink
                  exact
                  className="sidebar-item"
                  to="/users"
                  activeClassName="active"
                  onClick={this.handeleOpen}
                >
                  Users
                </NavLink>
                <NavLink
                  exact
                  className="sidebar-item"
                  to="/streams"
                  activeClassName="active"
                  onClick={this.handeleOpen}
                >
                  Streams
                </NavLink>
                <NavLink
                  exact
                  className="sidebar-item"
                  to="/reports"
                  activeClassName="active"
                  onClick={this.handeleOpen}
                >
                  Reports
                </NavLink>
                <NavLink
                  exact
                  className="sidebar-item"
                  to="/account/change-password"
                  onClick={this.handeleOpen}
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
                  onClick={this.handeleOpen}
                >
                  Logout
                </NavLink>
                Copyright @2019, Clgt
              </div>
            </BlockUi>
          </div>
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
