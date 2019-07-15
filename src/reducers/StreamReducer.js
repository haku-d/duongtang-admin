import client from 'client'

const defaultState = {
  streams: [],
  pagination: {}
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'LOAD_STREAM_COMPLETE':
      return {
        streams: action.data.items,
        pagination: action.data.meta
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
