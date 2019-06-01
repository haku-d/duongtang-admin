import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const PublicRoute = ({ component: Component, ...rest }) => {
  const auth = { ...rest }
  return (
    <Route
      {...rest}
      render={props => {
        if (auth.ui.login.isSuccess) {
          return <Redirect to="/dashboard" />
        }
        return <Component {...props} />
      }}
    />
  )
}
const mapStateToProps = state => {
  return {
    ui: state.ui
  }
}
const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PublicRoute)
