import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import PrivateRoute from 'components/route/PrivateRoute'
import Navbar from 'components/ui/Navbar'
import { hot } from 'react-hot-loader'
import LoginPage from 'components/account/LoginPage'
import LogoutPage from 'components/account/LogoutPage'
import VerifyPage from 'components/account/VerifyPage'
import ConfirmEmailPage from 'components/account/ConfirmEmailPage'
import { getLoginStatus } from 'reducers/UserReducer'
import HomePage from 'components/index/HomePage'
import GuestRoute from 'components/route/GuestRoute'
import DashBoard from 'components/admin/DashBoard'
import ListLinkDrive from 'components/admin/ListLinkDrive'
import Users from 'components/admin/Users'
import UserDetail from 'components/admin/UserDetail'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.props.getLoginStatus()
  }

  render() {
    return (
      <React.Fragment>
        <Navbar isLogged={this.props.isLogged} />
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/logout" component={LogoutPage} />
          <PrivateRoute exact path="/dashboard" component={DashBoard} />
          <PrivateRoute
            exact
            path="/list-link-drive"
            component={ListLinkDrive}
          />
          <PrivateRoute exact path="/users" component={Users} />
          <PrivateRoute exact path="/users/:id" component={UserDetail} />
          { this.props.isLogged ? <Redirect to="/dashboard" /> : null }
        </Switch>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLogged: state.user.isLogged
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getLoginStatus: () => dispatch(getLoginStatus())
  }
}

export default hot(module)(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(App)
  )
)
