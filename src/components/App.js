import React from 'react'
import { connect } from 'react-redux'
import { Switch, withRouter } from 'react-router-dom'
import PrivateRoute from 'components/common/route/PrivateRoute'
import GuestRoute from 'components/common/route/GuestRoute'
import { hot } from 'react-hot-loader'
import LoginPage from 'components/app/auth/LoginPage'
import LogoutPage from 'components/app/auth/LogoutPage'
import ChangePasswordPage from 'components/app/auth/ChangePasswordPage'
import ListUserPage from 'components/app/user/ListUserPage'
import DetailUserPage from 'components/app/user/DetailUserPage'
import DashBoard from 'components/app/dashboard/DashBoard'
import { initialize } from 'reducers/AppReducer'
import Sidebar from 'components/common/ui/Sidebar'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.props.initialize()
  }

  render() {
    return (
      <React.Fragment>
        <Sidebar />
        <Switch>
          <PrivateRoute exact path="/" component={DashBoard} />
          <PrivateRoute exact path="/account/logout" component={LogoutPage} />
          <PrivateRoute
            exact
            path="/account/change-password"
            component={ChangePasswordPage}
          />
          <PrivateRoute exact path="/users" component={ListUserPage} />
          <PrivateRoute exact path="/users/:id" component={DetailUserPage} />
          <GuestRoute exact path="/account/login" component={LoginPage} />
        </Switch>
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    initialize: () => dispatch(initialize())
  }
}

export default hot(module)(
  withRouter(
    connect(
      null,
      mapDispatchToProps
    )(App)
  )
)
