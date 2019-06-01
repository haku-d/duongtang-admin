import client from 'client'

const initialState = {
  pagination: {},
  list: [],
  isAddingUser: false,
  newUserId: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_LIST_USER_COMPLETE':
      return {
        ...state,
        pagination: action.data.meta,
        list: action.data.users
      }
    case 'SHOW_ADD_USER_MODAL':
      return {
        ...state,
        isAddingUser: true
      }
    case 'HIDE_ADD_USER_MODAL':
      return {
        ...state,
        isAddingUser: false
      }
    case 'ADD_USER_ERROR':
      return {
        ...state,
        hasError: true,
        msg: action.data
      }
    case 'ADD_USER_COMPLETE':
      return {
        ...state,
        isAddingUser: false,
        hasError: false,
        msg: '',
        newUserId: action.data
      }
    case 'LOAD_USER_COMPLETE':
      return {

      }
    default:
      return { ...state }
  }
}

export const getUsers = (filter, page) => {

  const params = {
    page: page
  }
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
    dispatch({type: 'GET_LIST_USER_BEGIN'})
    return client.get('/admin/users', params).then(rs => {
      dispatch({
        type: 'GET_LIST_USER_COMPLETE',
        data: rs.data
      })
    }).catch(err => {
      dispatch({
        type: 'GET_LIST_USER_ERROR',
        data: err
      })
    })
  }
}

export const showAddUserModal = () => {
  return dispatch => dispatch({type: 'SHOW_ADD_USER_MODAL'})
}

export const hideAddUserModal = () => {
  return dispatch => dispatch({type: 'HIDE_ADD_USER_MODAL'})
}

export const addUser = (user) =>  {
  return dispatch => {
    dispatch({type: 'ADD_USER_BEGIN'})
    return client.post('/admin/add-user', user).then(rs => {
      if (rs.status !== 200) {
        return Promise.reject(rs.message)
      }
      return dispatch({
        type: 'ADD_USER_COMPLETE',
        data: rs.data.user_id
      })
    }).catch(err => dispatch({type: 'ADD_USER_ERROR', data: err}))
  }
}

export const getUser = (id) => {
  return dispatch => {
    return client.get(`/user-info/${id}`).then(rs => {
      dispatch({
        type: 'LOAD_USER_COMPLETE',
        data: rs.data
      })
    })
  }
}
