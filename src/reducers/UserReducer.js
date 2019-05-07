import client from 'client'
import store from 'store'
import helper from 'helper'

const defaultState = {
  isLogged: false,
  balance: 0,
  email: '',
  apikey: ''
}

export default (state = defaultState, action) => {
  const nextState = Object.assign({}, state)

  if (action.type === 'getLoginStatus_success') {
    return Object.assign(nextState, {
      isLogged: true
    })
  }

  if (action.type === 'getLoginStatus_error') {
    store.remove('token')
    client.removeToken()
    return Object.assign(nextState, {
      isLogged: false
    })
  }

  if (action.type === 'login_success') {
    store.set('token', action.data.token)
    client.addTokenToHeader(action.data.token)
    return Object.assign(nextState, {
      isLogged: true
    })
  }

  if (action.type === 'logout_success') {
    store.remove('token')
    return Object.assign(nextState, {
      isLogged: false
    })
  }

  return nextState
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
          type: 'login_success',
          data: {
            msg: 'success!',
            token: res.data.access_token
          }
        })
      })
      .catch(err => {
        console.log('login', err)
        dispatch({
          type: 'login_error',
          data: {
            msg: helper.formatError(err)
          }
        })
      })
  }
}

const register = ({ email, password }) => {
  return dispatch => {
    dispatch({
      type: 'register_begin'
    })
    client
      .api('/register', 'post', { email, password })
      .then(res => {
        dispatch({
          type: 'register_success',
          data: {
            msg: 'success!'
          }
        })
      })
      .catch(err => {
        console.log('register:', err)
        dispatch({
          type: 'register_error',
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
    dispatch({ type: 'logout_success' })
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
  return dispatch => {
    // if token not found -> user is not logged
    const token = store.get('token')
    if (!token) {
      return dispatch({ type: 'getLoginStatus_error' })
    }

    dispatch({
      type: 'getLoginStatus_begin'
    })

    client.addTokenToHeader(token)
    client
      .api('/me')
      .then(res =>
        dispatch({
          type: 'getLoginStatus_success'
        })
      )
      .catch(err =>
        dispatch({
          type: 'getLoginStatus_error'
        })
      )
  }
}

export { getLoginStatus, login, register, logout, verifyEmail }
