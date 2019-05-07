// Route exclusive for guest
// for example: loginpage or registerpage should not be access by logged user

import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const GuestRoute = props => {
  const { component: Component } = props
  if (props.ui.getLoginStatus.isLoading === true) return <span />

  return (
    <Route
      {...props.routeProps}
      render={() => (props.user.isLogged ? <Redirect to="/" /> : <Component />)}
    />
  )
}
const mapStateToProps = (state, props) => {
  return {
    component: props.component,
    ui: state.ui,
    user: state.user
  }
}
export default connect(
  mapStateToProps,
  null
)(GuestRoute)
