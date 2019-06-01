import React from 'react'
import { connect } from 'react-redux'
import { Switch, withRouter } from 'react-router-dom'
import PrivateRoute from 'components/route/PrivateRoute'
import GuestRoute from 'components/route/GuestRoute'
import { hot } from 'react-hot-loader'
import LoginPage from 'components/account/LoginPage'
import LogoutPage from 'components/account/LogoutPage'
import { checkLoginStatus } from 'reducers/UserReducer'
import Users from 'components/admin/Users'
import UserDetail from 'components/admin/UserDetail'
import DashBoard from 'components/index/DashBoard'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.props.checkLoginStatus()
  }

  render() {
    return (
      <Switch>
        <GuestRoute exact path="/account/login" component={LoginPage} />
        <PrivateRoute exact path="/account/logout" component={LogoutPage} />
        <PrivateRoute exact path="/" component={DashBoard} />
        <PrivateRoute exact path="/users" component={Users} />
        <PrivateRoute exact path="/users/:id" component={UserDetail} />
      </Switch>
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
    checkLoginStatus: () => dispatch(checkLoginStatus())
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
