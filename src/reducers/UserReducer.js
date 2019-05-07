import client from 'client'
import store from 'store'
import helper from 'helper'

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

// return the authentication of current user
const getLoginStatus = () => {
  return dispatch => {
    // if token not found -> user is not logged
    const token = store.get('token')
    if (!token) {
      return dispatch({ type: 'getLoginStatus_error' })
    }

    // show loading if needed
    dispatch({
      type: 'getLoginStatus_begin'
    })

    client.addTokenToHeader(token)
    client
      .api('/user/apps')
      .then(res => dispatch({ type: 'getLoginStatus_success' }))
      .catch(err =>
        dispatch({
          type: 'getLoginStatus_error',
          data: {
            msg: helper.formatError(err)
          }
        })
      )
  }
}

// user reducer
const defaultState = {
  isLogged: false
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

export { getLoginStatus, login, register, logout }
