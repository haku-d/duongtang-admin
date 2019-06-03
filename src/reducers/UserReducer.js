import client from 'client'

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_ADD_USER_MODAL':
      return {
        ...state,
        isAddingNew: !state.isAddingNew
      }
    case 'ADD_USER_COMPLETE':
      return {
        ...state,
        isAddingNew: false
      }
    default:
      return state
  }
}

export const getUsers = (filter, page) => {
  const params = {
    page: page,
    filter: filter
  }

  return dispatch => {
    dispatch({ type: 'GET_LIST_USER_BEGIN' })
    return client
      .get('/admin/users', params)
      .then(rs => {
        dispatch({
          type: 'GET_LIST_USER_COMPLETE',
          data: rs.data
        })
        return rs.data
      })
      .catch(err => {
        dispatch({
          type: 'GET_LIST_USER_ERROR',
          data: err.toString()
        })
      })
  }
}

export const toggleAddUserModal = () => {
  return dispatch => dispatch({ type: 'TOGGLE_ADD_USER_MODAL' })
}

export const addUser = user => {
  return dispatch => {
    dispatch({ type: 'ADD_USER_BEGIN' })
    return client
      .post('/admin/add-user', user)
      .then(rs => {
        if (rs.status !== 200) {
          throw new Error(rs.message)
        }
        dispatch({type: 'ADD_USER_COMPLETE'})
        return rs.data.user_id
      })
  }
}

export const getUser = id => {
  return dispatch => {
    dispatch({type: 'LOAD_USER_START'})
    return client.get(`/user-info/${id}`).then(rs => {
      dispatch({
        type: 'LOAD_USER_COMPLETE'
      })
      return rs.data
    })
  }
}

export const addBilling = (id, amount) => {
  return dispatch => {
    const data = {
      user_id: id,
      amount: amount
    }
    return client.post('admin/billing', data).then(rs => {
      if (rs.status === 200) {
        dispatch({ type: 'UPDATE_BILLING_COMPLETED', payload: data })
      }
    })
  }
}

export const getUserInfo = id => {
  const userReq = client.get(`/user/${id}`)
  const appsReq = client.get(`/admin/user/${id}/apps`).then(rs => rs.data)

  return dispatch => {
    return client.all([userReq, appsReq]).then(
      client.spread((user, apps) => {
        dispatch({ type: 'LOAD_USER_COMPLETED', payload: user })
        dispatch({ type: 'LOAD_USER_APP_COMPLETED', payload: apps })
      })
    )
  }
}

export const getUserApps = id => {
  return dispatch => {
    dispatch({type: 'LOAD_USER_APP_START'})
    return client.get(`/admin/user/${id}/apps`).then(rs => {
      dispatch({type: 'LOAD_USER_APP_COMPLETE'})
      return rs.data
    })
  }
}
