import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'


function PrivateRoute({ component: Component, isInit, isLogged, ...rest }) {

  if (isInit) {
    return <span>Loading</span>
  }

  return (
    <Route
      {...rest}
      render={props =>
        isLogged ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/account/login",
              state: { from: props.location }
            }}
          />
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
)(PrivateRoute)
