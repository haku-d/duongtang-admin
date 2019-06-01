import React from 'react'
import { logout } from 'reducers/UserReducer'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

const Logout = props => {
  props.logout()
  return <Redirect to="/" />
}

export default connect(
  null,
  dispatch => ({ logout: () => dispatch(logout()) })
)(Logout)
