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
  loadingState,
  successState,
  errorState,
  loggedState
}) => (state = defaultState, action) => {
  let nextState = Object.assign({}, state)

  if (action.type === loadingState) {
    nextState.isInit = false
    nextState.isLoading = true
  }

  if (action.type === successState) {
    nextState.isLoading = false
    nextState.isSuccess = true
    nextState.isError = false
    nextState.msg = action.data.msg
  }

  if (action.type === errorState) {
    nextState.isLoading = false
    nextState.isSuccess = false
    nextState.isError = true
    nextState.msg = action.data.msg
  }

  if (action.type === loggedState) {
    nextState.isLoading = false
    nextState.isSuccess = false
    nextState.isError = false
  }

  return nextState
}

export default combineReducers({
  login: createReducer({
    defaultState: defaultState,
    loadingState: 'login_begin',
    successState: 'login_success',
    errorState: 'login_error',
    loggedState: 'logout_success'
  }),
  register: createReducer({
    defaultState: defaultState,
    loadingState: 'register_begin',
    successState: 'register_success',
    errorState: 'register_error',
    loggedState: 'logout_success'
  })
})
