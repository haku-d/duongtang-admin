import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { LOGOUT } from 'actions/user'
import client from 'client'

const Logout = props => {
  props.logout()
  client.logout()
  return <Redirect to="/account/login" />
}

export default connect(
  null,
  dispatch => ({ logout: () => dispatch({ type: LOGOUT }) })
)(Logout)
