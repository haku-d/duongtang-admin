import React from 'react'
import { connect } from 'react-redux'
import { Switch, withRouter } from 'react-router-dom'
import PrivateRoute from 'components/route/PrivateRoute'
import GuestRoute from 'components/route/GuestRoute'
import { hot } from 'react-hot-loader'
import LoginPage from 'components/account/LoginPage'
import { checkLoginStatus } from 'reducers/MeReducer'
import ListUserPage from 'components/user/ListUserPage'
import DetailUserPage from 'components/user/DetailUserPage'
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
        <PrivateRoute exact path="/" component={DashBoard} />
        <PrivateRoute exact path="/users" component={ListUserPage} />
        <PrivateRoute exact path="/users/:id" component={DetailUserPage} />
      </Switch>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLogged: state.me.isLogged
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
