import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'
import PrivateRoute from 'components/route/PrivateRoute'
import { hot } from 'react-hot-loader'
import LoginPage from 'components/account/LoginPage'
import LogoutPage from 'components/account/LogoutPage'
import { checkLoginStatus } from 'reducers/UserReducer'
import DashBoard from 'components/admin/DashBoard'
import ListLinkDrive from 'components/admin/ListLinkDrive'
import Users from 'components/admin/Users'
import UserDetail from 'components/admin/UserDetail'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.props.checkLoginStatus()
  }

  render() {
    return (
      <Switch>
        <PrivateRoute exact path="/" component={DashBoard} />
        <PrivateRoute exact path="/list-link-drive" component={ListLinkDrive} />
        <PrivateRoute exact path="/users" component={Users} />
        <PrivateRoute exact path="/users/:id" component={UserDetail} />

        <Route exact path="/account/login" component={LoginPage} />
        <Route exact path="/account/logout" component={LogoutPage} />
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
