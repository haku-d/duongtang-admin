import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import store from 'store'

const PrivateRoute = ({ component: Component, ...rest }) => {
  // const authen = { ...rest }
  return (
    <Route
      {...rest}
      render={props => {
        if (store.get('token') !== undefined) {
          return <Component {...props} />
        }
        return <Redirect to="/login" />
      }}
    />
  )
}
export default PrivateRoute
