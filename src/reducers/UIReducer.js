import { combineReducers } from 'redux'

const defaultState = {
  isInit: true,
  isLoading: false,
  isSuccess: false,
  isError: false,
  msg: ''
}
// factory function
const createReducer = ({
  defaultState,
  onStart,
  onSuccess,
  onError
}) => (
  state = defaultState,
  action
) => {
  let nextState = Object.assign({}, state)

  if (action.type === onStart) {
    Object.assign(nextState, {
      isInit: false,
      isLoading: true
    })
  }

  if (action.type === onSuccess) {
    Object.assign(nextState, {
      isInit: false,
      isLoading: false,
      isSuccess: true,
      isError: false,
      msg: action.data ? action.data.msg : ''
    })
  }

  if (action.type === onError) {
    Object.assign(nextState, {
      isInit: false,
      isLoading: false,
      isSuccess: false,
      isError: true,
      msg: action.data ? action.data.msg : ''
    })
  }

  return nextState
}

export default combineReducers({
  getLoginStatus: createReducer({
    defaultState: defaultState,
    onStart: 'getLoginStatus_begin',
    onSuccess: 'getLoginStatus_success',
    onError: 'getLoginStatus_error'
  }),
  login: createReducer({
    defaultState: defaultState,
    onStart: 'login_begin',
    onSuccess: 'login_success',
    onError: 'login_error'
  }),
  getUsers: createReducer({
    defaultState: defaultState,
    onStart: 'GET_LIST_USER_BEGIN',
    onSuccess: 'GET_LIST_USER_COMPLETE',
    onError: 'GET_LIST_USER_ERROR'
  }),
  addUser: createReducer({
    defaultState: defaultState,
    onStart: 'ADD_USER_BEGIN',
    onSuccess: 'ADD_USER_COMPLETE',
    onError: 'ADD_USER_ERROR'
  })
})
