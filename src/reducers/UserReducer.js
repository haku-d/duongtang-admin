import client from 'client'

const defaultState = {
  isOpenCreateUserModal: false,
  isOpenAddBillingModal: false,
  isOpenAddUserAppModal: false,
  users: [],
  pagination: {},
  user: {},
  userApps: [],
  transactions: {
    items: []
  },
  errorMsg: ''
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'TOGGLE_ADD_USER_MODAL':
      return {
        ...state,
        isOpenCreateUserModal: action.data
      }
    case 'TOGGLE_ADD_BILLING_MODAL':
      return {
        ...state,
        isOpenAddBillingModal: action.data
      }
    case 'TOGGLE_ADD_USER_APP_MODAL':
      return {
        ...state,
        isOpenAddUserAppModal: action.data
      }
    case 'ADD_USER_COMPLETE':
      return {
        ...state,
        isAddingNew: false
      }
    case 'GET_LIST_USER_COMPLETE':
      return {
        ...state,
        users: action.data.users,
        pagination: action.data.meta
      }
    case 'LOAD_USER_COMPLETED':
      return {
        ...state,
        user: action.data
      }
    case 'LOAD_USER_APP_COMPLETED':
      return {
        ...state,
        userApps: action.data
      }
    case 'UPDATE_BILLING_COMPLETED':
      return {
        ...state,
        user: {
          ...state.user,
          balance: state.user.balance + action.data
        }
      }
    case 'UPDATE_USER_STATUS_COMPLETE':
      return {
        ...state,
        user: {
          ...state.user,
          is_active:
            state.user.id === action.data.user_id
              ? action.data.is_active
              : state.user.is_active
        },
        users: state.users.map(user => {
          if (user.id === action.data.user_id) {
            user.is_active = action.data.is_active
          }
          return user
        })
      }
    case 'ADD_USER_APP_COMPLETED':
      return {
        ...state,
        isOpenAddUserAppModal: false,
        userApps: [...state.userApps, action.data]
      }
    case 'LOAD_USER_TRANSACTION_COMPLETED':
      return {
        ...state,
        transactions: action.data
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
      })
      .catch(err => {
        dispatch({
          type: 'GET_LIST_USER_ERROR',
          data: err.toString()
        })
      })
  }
}

export const toggleCreateUserModal = isOpen => {
  return dispatch => dispatch({ type: 'TOGGLE_ADD_USER_MODAL', data: isOpen })
}

export const toggleAddUserAppModal = isOpen => {
  return dispatch =>
    dispatch({ type: 'TOGGLE_ADD_USER_APP_MODAL', data: isOpen })
}

export const toggleAddBillingModal = isOpen => {
  return dispatch =>
    dispatch({ type: 'TOGGLE_ADD_BILLING_MODAL', data: isOpen })
}

export const addUser = user => {
  return dispatch => {
    dispatch({ type: 'ADD_USER_BEGIN' })
    return client.post('/admin/add-user', user).then(rs => {
      if (rs.status !== 200) {
        throw new Error(rs.message)
      }
      dispatch({ type: 'ADD_USER_COMPLETE' })
      return rs.data.user_id
    })
  }
}

export const getUser = id => {
  return dispatch => {
    dispatch({ type: 'LOAD_USER_START' })
    return client.get(`/user-info/${id}`).then(rs => {
      dispatch({
        type: 'LOAD_USER_COMPLETE'
      })
      return rs.data
    })
  }
}

export const addBilling = (id, amount, note) => {
  return dispatch => {
    const data = {
      user_id: id,
      amount: amount,
      note: note
    }
    return client.post('admin/billing', data).then(rs => {
      if (rs.status === 200) {
        dispatch({ type: 'UPDATE_BILLING_COMPLETED', data: amount })
      }
    })
  }
}

export const getUserInfo = id => {
  const userReq = client.get(`/user-info/${id}`).then(rs => rs.data)
  const appsReq = client.get(`/admin/user/${id}/apps`).then(rs => rs.data)
  const transactionsReq = client
    .get(`/admin/user/${id}/transactions`)
    .then(rs => rs.data)

  return dispatch => {
    return client.all([userReq, appsReq, transactionsReq]).then(
      client.spread((user, apps, transactions) => {
        dispatch({ type: 'LOAD_USER_COMPLETED', data: user })
        dispatch({ type: 'LOAD_USER_APP_COMPLETED', data: apps })
        dispatch({
          type: 'LOAD_USER_TRANSACTION_COMPLETED',
          data: transactions
        })
      })
    )
  }
}

export const updateUserStatus = (id, is_active) => {
  return dispatch => {
    const data = {
      user_id: id,
      is_active: is_active
    }
    return client.post('/admin/user/update-status', data).then(() => {
      dispatch({
        type: 'UPDATE_USER_STATUS_COMPLETE',
        data: data
      })
    })
  }
}

export const addApp = (id, streamType, shortDomain) => {
  return dispatch => {
    const data = {
      user_id: id,
      stream_type: streamType,
      short_domain: shortDomain
    }
    return client.post('admin/create-user-app', data).then(rs => {
      if (rs.status === 200) {
        dispatch({ type: 'ADD_USER_APP_COMPLETED', data: rs.data })
      }
    })
  }
}

export const disableApp = id => {
  return dispatch => {
    const data = { id }
    return client.post('admin/disable-user-app', data).then(rs => {
      if (rs.status === 200) {
        dispatch({ type: 'UPDATE_USER_APP_COMPLETED', data: rs.data })
      }
    })
  }
}

export const enableApp = id => {
  return dispatch => {
    const data = { id }
    return client.post('admin/enable-user-app', data).then(rs => {
      if (rs.status === 200) {
        dispatch({ type: 'UPDATE_USER_APP_COMPLETED', data: rs.data })
      }
    })
  }
}
