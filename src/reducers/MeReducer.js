import client from 'client'
import store from 'store'
import helper from 'helper'

const defaultState = {
  isLogged: false,
  email: ''
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'login_success':
    case 'checkLoginStatus_success':
      return Object.assign({}, state, {
        isLogged: true,
        email: action.data.email
      })
    case 'user_logout':
      return {
        ...defaultState
      }
    default:
      return { ...state }
  }
}

const login = ({ email, password }) => {
  return dispatch => {
    dispatch({ type: 'login_begin' })
    client
      .api('/login', 'post', { email, password })
      .then(res => {
        if (res.data.status !== 200 || res.headers['x-token'] === undefined) {
          throw new Error(res.data.message)
        }

        client.updateToken(res.headers['x-token'])
        store.set('token', res.headers['x-token'])
        dispatch({
          type: 'login_success',
          data: res.data.data
        })
      })
      .catch(err => {
        dispatch({
          type: 'login_error',
          data: {
            msg: helper.formatError(err)
          }
        })
      })
  }
}

const logout = () => {
  return dispatch => {
    client.api('/logout', 'get').then(res => {
      client.removeToken()
      store.remove('token')
      dispatch({ type: 'user_logout' })
    })
  }
}

const changePassword = ({ current_pw, new_pw }) => {
  return dispatch => {
    dispatch({
      type: 'changePassword_begin'
    })
    client
      .api('change-password', 'post', { current_pw, new_pw })
      .then(res => {
        // api chổ này trả về status nằm trong data: {}
        if (res.data.status !== 200) {
          throw new Error(res.data.message)
        }
        dispatch({
          type: 'changePassword_success',
          data: {
            msg: 'Your password has been changed successfully!'
          }
        })
      })
      .catch(err => {
        dispatch({
          type: 'changePassword_error',
          data: {
            msg: helper.formatError(err)
          }
        })
      })
  }
}

// return the authentication of current user
const checkLoginStatus = () => dispatch => {
  dispatch({
    type: 'checkLoginStatus_begin'
  })

  const token = store.get('token')

  if (token === undefined) {
    return dispatch({ type: 'checkLoginStatus_error' })
  }

  client.updateToken(token)

  client
    .get('/me')
    .then(data => {
      if (data.status !== 200) {
        throw new Error('token invalid')
      }
      dispatch({
        type: 'checkLoginStatus_success',
        data: data.data
      })
    })
    .catch(err => {
      store.remove('token')
      dispatch({ type: 'checkLoginStatus_error' })
    })
}

export {
  checkLoginStatus,
  login,
  changePassword,
  logout
}
