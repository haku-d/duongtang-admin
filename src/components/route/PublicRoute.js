import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

// const PrivateRoute = props => {
//   const { component: Component } = props
//   return (
//     <Route
//       {...props.routeProps}
//       render={() => {
//         // render component if user logged
//         if (props.user.isLogged) {
//           return <Component location={props.routeProps.location} />
//         }

//         // user is not logged redirect to login page
//         return (
//           <Redirect
//             to={{
//               pathname: '/',
//               state: { from: props.location }
//             }}
//           />
//         )
//       }}
//     />
//   )
// }

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
  // console.log(state)
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
