import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import PrivateRoute from 'components/route/PrivateRoute'
import Navbar from 'components/ui/Navbar'
import { hot } from 'react-hot-loader'
import LoginPage from 'components/account/LoginPage'
import LogoutPage from 'components/account/LogoutPage'
import VerifyPage from 'components/account/VerifyPage'
import RegisterPage from 'components/account/RegisterPage'
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

    // check if the current user is logged or not
    this.props.getLoginStatus()
  }

  render() {
    return (
      <React.Fragment>
        <Navbar isLogged={this.props.user.isLogged} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <GuestRoute exact path="/login" component={LoginPage} />
          <GuestRoute exact path="/register" component={RegisterPage} />
          <Route exact path="/verify" component={VerifyPage} />

          <Route exact path="/confirm-email" component={ConfirmEmailPage} />
          <Route exact path="/logout" component={LogoutPage} />

          <PrivateRoute exact path="/dashboard" component={DashBoard} />
          <PrivateRoute
            exact
            path="/list-link-drive"
            component={ListLinkDrive}
          />
          <PrivateRoute exact path="/users" component={Users} />
          <PrivateRoute exact path="/users/:id" component={UserDetail} />
          <Redirect to="/login" />
        </Switch>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  // console.log(state)
  return {
    ui: state.ui,
    user: state.user
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
