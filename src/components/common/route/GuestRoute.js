// Route exclusive for guest
// for example: loginpage or registerpage should not be access by logged user

import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const GuestRoute = ({component: Component, isLogged, ...rest}) => {
  return (
    <Route
      {...rest}
      render={props =>
        isLogged ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        )
      }
    />
  )
}
const mapStateToProps = (state) => {
  return {...state.app}
}
export default connect(
  mapStateToProps,
  null
)(GuestRoute)
