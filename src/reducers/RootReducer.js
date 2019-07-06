import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import AppReducer from 'reducers/AppReducer'
import UIReducer from 'reducers/UIReducer'
import UserReducer from 'reducers/UserReducer'
import DashboardReducer from 'reducers/DashboardReducer'

export default history =>
  combineReducers({
    router: connectRouter(history),
    app: AppReducer,
    ui: UIReducer,
    user: UserReducer,
    dashboard: DashboardReducer
  })
