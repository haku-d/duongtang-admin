import client from 'client'

const defaultState = {
  earnings: {
    data_labels: [],
    data_values: []
  }
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'LOAD_WEEKLY_EANRING_REPORT_COMPLETE':
      return {
        ...state,
        earnings: action.data
      }
    default:
      return state
  }
}

export function getWeeklyEarning(days) {
  return dispatch => {
    return client
      .get(`/admin/report/earning`, {
        days: days
      })
      .then(rs => {
        dispatch({
          type: 'LOAD_WEEKLY_EANRING_REPORT_COMPLETE',
          data: rs.data
        })
      })
  }
}
