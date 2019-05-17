import client from 'client'
import store from 'store'
import helper from 'helper'

import * as actions from 'actions/user'

const defaultState = {
  isLogged: false,
  isAddingUser: false
}

export default (state = defaultState, action) => {
  switch(action.type) {
    case actions.SIGNIN_SUCCESS:
    case actions.LOGGED_IN:
      return {
        ...state,
        isLogged: true
      }
    case actions.LOGOUT:
      return {
        ...state,
        isLogged: false
      }
    case actions.ADD_USER:
      return {
        ...state,
        isAddingUser: true
      }
    case actions.ADD_USER_CANCELED:
    case actions.ADD_USER_COMPLETED:
      return {
        ...state,
        isAddingUser: false
      }
    case actions.LOADED_ALL_USERS:
      return {
        ...state,
        list_users: action.payload
      }
    default:
      return state
  }
}

const login = ({ email, password }) => {
  return dispatch => {
    dispatch({
      type: 'login_begin'
    })

    client
      .login({ email, password })
      .then(res => {
        dispatch({
          type: actions.SIGNIN_SUCCESS,
          data: {
            msg: 'success!',
            token: res.data.access_token
          }
        })
      })
      .catch(err => {
        console.log('login', err)
        dispatch({
          type: actions.SIGNIN_FAILURE,
          data: {
            msg: helper.formatError(err)
          }
        })
      })
  }
}

const logout = () => {
  return dispatch => {
    client.logout()
    dispatch({ type: actions.LOGOUT })
  }
}

const verifyEmail = query => {
  return dispatch => {
    dispatch({ type: 'verifyEmail_begin' })

    client
      .api('/verify-code' + query, 'post')
      .then(res => dispatch({ type: 'verifyEmail_success' }))
      .catch(err =>
        dispatch({
          type: 'verifyEmail_error',
          data: { msg: 'Could not verify your email, please try again later!' }
        })
      )
  }
}

// return the authentication of current user
const getLoginStatus = () => {
  const token = store.get('token')

  if (token === undefined) {
    return dispatch => dispatch({ type: actions.LOGOUT })
  }

  client.updateToken(token)

  return dispatch => {
    client
      .get('/me')
      .then(
        res => dispatch({type: res.status === 401 ? actions.LOGOUT  : actions.LOGGED_IN }),
      )
  }
}

const getUsers = (id, email) => {
  return dispatch => {
    return client.get('/admin/users')
      .then((rs) => dispatch({ type: actions.LOADED_ALL_USERS, payload: rs.data }))
  }
}

export { getLoginStatus, login, logout, verifyEmail, getUsers }
