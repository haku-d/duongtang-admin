import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter, Redirect, NavLink } from 'react-router-dom'
import PrivateRoute from 'components/route/PrivateRoute'

import { hot } from 'react-hot-loader'
import Navbar from 'components/ui/Navbar'
import LoginPage from 'components/account/LoginPage'
import RegisterPage from 'components/account/RegisterPage'
import ConfirmEmailPage from 'components/account/ConfirmEmailPage'
import { getLoginStatus } from 'reducers/UserReducer'

import ListLinkDrive from 'components/ListLinkDrive'

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
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/confirm-email" component={ConfirmEmailPage} />
          <PrivateRoute
            exact
            path="/list-link-drive"
            component={ListLinkDrive}
          />
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
