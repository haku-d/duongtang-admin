import store from 'store'
import client from 'client'

const defaultState = {
  isInit: true,
  isLogged: false
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'initialize_complete':
      return {
        ...state,
        isInit: false
      }
    case 'initialize_success':
      return {
        ...state,
        isLogged: true
      }
    case 'login_success':
      return {
        ...state,
        isLogged: true
      }
    case 'logout_success':
      return {
        ...state,
        isLogged: false
      }
    default:
      return state
  }
}

const getAccessToken = () => {
  const token = store.get('token')
  return token !== undefined ? token : Promise.reject('user is not logged in')
}

const checkTokenExpired = token => {
  return client.addHeader('x-token', token).get('/me')
}

export const initialize = () => {
  return dispatch => {
    return Promise.resolve()
      .then(() => getAccessToken())
      .then(token => checkTokenExpired(token))
      .then(() => {
        dispatch({ type: 'initialize_success' })
      })
      .catch(err => {
        dispatch({ type: 'initialize_error' })
      })
      .finally(() => {
        dispatch({ type: 'initialize_complete' })
      })
  }
}

export const login = ({ email, password }) => {
  const checkHeaderToken = response => {
    if (response.headers['x-token'] === undefined) {
      throw new Error(response.data.message)
    }
    return response.headers['x-token']
  }

  return dispatch => {
    dispatch({ type: 'login_begin' })
    return client
      .api('/login', 'post', { email, password })
      .then(response => checkHeaderToken(response))
      .then(token => {
        client.updateToken(token)
        store.set('token', token)
        dispatch({ type: 'login_success' })
      })
      .finally(() => dispatch({ type: 'login_complete' }))
  }
}

export const logout = () => {
  return dispatch =>
    client.get('/logout').then(() => {
      client.removeToken()
      store.remove('token')
      dispatch({ type: 'logout_success' })
    })
}

export const changePassword = ({ current_pw, new_pw }) => {
  return dispatch => {
    dispatch({
      type: 'changePassword_begin'
    })
    return client.post('change-password', { current_pw, new_pw })
      .finally(() => dispatch({type: 'changePassword_complete'}))
  }
}
