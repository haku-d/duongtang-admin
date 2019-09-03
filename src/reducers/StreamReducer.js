import client from 'client'

const defaultState = {
  streams: [],
  pagination: {},
  isLoading: false
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'LOAD_STREAM_BEGIN':
      return {
        ...state,
        isLoading: true
      }
    case 'LOAD_STREAM_COMPLETE':
      return {
        streams: action.data.items,
        pagination: action.data.meta,
        isLoading: false
      }
    default:
      return state
  }
}

export const getStream = (source_id, page) => {
  return dispatch => {
    dispatch({ type: 'LOAD_STREAM_BEGIN' })
    return client.get('/admin/streams', { source_id, page }).then(res => {
      dispatch({ type: 'LOAD_STREAM_COMPLETE', data: res.data })
    })
  }
}

export const getTopViewedStream = () => {
  return dispatch => {
    dispatch({ type: 'LOAD_STREAM_BEGIN' })
    return client.get('/admin/top-viewed-stream').then(res => {
      dispatch({ type: 'LOAD_STREAM_COMPLETE', data: res.data })
    })
  }
}
