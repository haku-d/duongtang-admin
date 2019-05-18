import client from 'client'
import store from 'store'
import helper from 'helper'

import * as actions from 'actions/user'

const defaultState = {
  isLogged: false,
  isAddingUser: false
}

export default (state = defaultState, action) => {
  switch (action.type) {
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
    case actions.DISABLED_USER:
      return {
        ...state,
        list_users: Object.assign({
          ...state.list_users,
          users: state.list_users.users.map(user => {
            if (user.id === action.payload) {
              user.is_active = false
            }
            return user
          })
        })
      }
    case actions.ENABLED_USER:
      return {
        ...state,
        list_users: Object.assign({
          ...state.list_users,
          users: state.list_users.users.map(user => {
            if (user.id === action.payload) {
              user.is_active = true
            }
            return user
          })
        })
      }
    case actions.UPDATE_BILLING_COMPLETED:
      const user = Object.assign({}, state.user)
      if (user.id === action.payload.user_id) {
        user.balance += action.payload.amount
      }
      return {
        ...state,
        user: user
      }
    case actions.LOAD_USER_COMPLETED:
      return {
        ...state,
        user: action.payload
      }
    case actions.LOAD_USER_APP_COMPLETED:
      return {
        ...state,
        user_apps: action.payload
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
      .then(access_token => {
        dispatch({
          type: actions.SIGNIN_SUCCESS,
          data: {
            msg: 'success!',
            token: access_token
          }
        })
      })
      .catch(err => {
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
const checkLoginStatus = () => {
  const token = store.get('token')

  if (token === undefined) {
    return dispatch => dispatch({ type: actions.LOGOUT })
  }

  client.updateToken(token)

  return dispatch => {
    client.get('/me').then(res =>
      dispatch({
        type: res.status === 401 ? actions.LOGOUT : actions.LOGGED_IN
      })
    )
  }
}

const getUsers = filter => {
  const params = {}
  const isEmail = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(
    filter
  )
  const isId = !isNaN(parseInt(filter))

  if (isEmail) {
    params['email'] = filter
  }

  if (isId) {
    params['id'] = filter
  }

  return dispatch => {
    return client
      .get('/admin/users', params)
      .then(rs =>
        dispatch({ type: actions.LOADED_ALL_USERS, payload: rs.data })
      )
  }
}

const updateStatus = (id, status) => {
  return dispatch => {
    const data = {
      user_id: id,
      status: status
    }
    return client.post('/admin/user/update_status', data).then(rs => {
      if (rs.status === 200) {
        dispatch({
          type: status ? actions.ENABLED_USER : actions.DISABLED_USER,
          payload: id
        })
      }
    })
  }
}

const addBilling = (id, amount) => {
  return dispatch => {
    const data = {
      user_id: id,
      amount: amount
    }
    return client.post('admin/billing', data).then(rs => {
      if (rs.status === 200) {
        dispatch({ type: actions.UPDATE_BILLING_COMPLETED, payload: data })
      }
    })
  }
}

const getUserInfo = id => {
  const userReq = client.get(`/user/${id}`)
  const appsReq = client.get(`/admin/user/${id}/apps`).then(rs => rs.data)

  return dispatch => {
    return client.all([userReq, appsReq]).then(
      client.spread((user, apps) => {
        dispatch({ type: actions.LOAD_USER_COMPLETED, payload: user })
        dispatch({ type: actions.LOAD_USER_APP_COMPLETED, payload: apps })
      })
    )
  }
}

export {
  checkLoginStatus,
  login,
  logout,
  verifyEmail,
  getUsers,
  updateStatus,
  addBilling,
  getUserInfo
}
