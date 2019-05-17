import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import store from 'store'

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (store.get('token') !== undefined) {
          return <Component {...props} />
        }
        return <Redirect to="/" />
      }}
    />
  )
}
export default PrivateRoute
