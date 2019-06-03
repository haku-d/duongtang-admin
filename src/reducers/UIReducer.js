const defaultState = {
  isInit: true,
  isLoading: false,
}

export default (state = defaultState, action) => {

  if (action.type === 'initialize_complete') {
    return {
      ...state,
      isInit: false
    }
  }

  if(/begin$/.test(action.type)) {
    return {
      ...state,
      isLoading: true
    }
  }

  if (/(success|error|complete)$/.test(action.type)) {
    return {
      ...state,
      isLoading: false
    }
  }

  return state
}
