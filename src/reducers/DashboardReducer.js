import client from 'client'
import numeral from 'numeral'

const defaultState = {
  today_req: 0,
  totay_earn: 0,
  today_req_details: []
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'LOAD_TODAY_REQUEST_COMPLETE':
      return {
        ...state,
        today_req: numeral(action.data.total_req).format('0,0'),
        totay_earn: numeral(action.data.total_earn).format('0,0')
      }
    case 'LOAD_TODAY_REQUEST_DETAIL_COMPLETE':
      return {
        ...state,
        today_req_details: action.data
      }
    default:
      return state
  }
}

export function getRequest() {
  return dispatch => {
    return client.get(`/stats/request`).then(rs => {
      dispatch({
        type: 'LOAD_TODAY_REQUEST_COMPLETE',
        data: rs.data
      })
    })
  }
}
export function getRequestDetail() {
  return dispatch => {
    return client.get(`/stats/request-detail`).then(rs => {
      dispatch({
        type: 'LOAD_TODAY_REQUEST_DETAIL_COMPLETE',
        data: rs.data
      })
    })
  }
}
