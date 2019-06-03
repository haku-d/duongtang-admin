const defaultState = {
  isInit: true,
  isLoading: false,
  isSuccess: false,
  isError: false,
  msg: ''
}

export default (state = defaultState, action) => {
  switch(action.type) {
    case 'checkLoginStatus_begin':
    case 'GET_LIST_USER_BEGIN':
      return {
        ...state,
        isLoading: true
      }
    case 'checkLoginStatus_success':
    case 'GET_LIST_USER_COMPLETE':
      return {
        ...state,
        isLoading: false
      }
    default:
      return state
  }
}
