import client from 'client'
import numeral from 'numeral'

const defaultState = {
  today_view: 0,
  today_upload: 0,
  totay_earn: 0,
  today_req_details: []
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'LOAD_TODAY_REQUEST_COMPLETE':
      const view_stats = action.data.find(item => item.type === 'VIEW')
      const upload_stats = action.data.find(
        item => item.type === 'UPLOAD_PHOTO'
      )
      return {
        ...state,
        today_view: numeral(view_stats ? view_stats.total_req : 0).format(
          '0,0'
        ),
        today_upload: numeral(upload_stats ? upload_stats.total_req : 0).format(
          '0,0'
        ),
        totay_earn: numeral(
          action.data.reduce((acc, curr) => acc + curr.total_earn, 0)
        ).format('0,0')
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
