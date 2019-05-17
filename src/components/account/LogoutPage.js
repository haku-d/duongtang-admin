import React from 'react'
import { logout } from 'reducers/UserReducer'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { LOGOUT } from 'actions/user'
import client from 'client'

const Logout = props => {
  props.logout()
  client.logout()
  return <Redirect to="/" />
}

export default connect(
  null,
  dispatch => ({ logout: () => dispatch({ type: LOGOUT }) })
)(Logout)
