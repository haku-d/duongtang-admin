import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import UIReducer from 'reducers/UIReducer'
import UserReducer from 'reducers/UserReducer'

export default history =>
  combineReducers({
    router: connectRouter(history),
    ui: UIReducer,
    user: UserReducer
  })
