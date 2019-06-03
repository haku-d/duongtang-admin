import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import UIReducer from 'reducers/UIReducer'
import UserReducer from 'reducers/UserReducer'
import MeReducer from 'reducers/MeReducer'

export default history =>
  combineReducers({
    router: connectRouter(history),
    ui: UIReducer,
    me: MeReducer,
    user: UserReducer
  })
