import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'
import { createBrowserHistory } from 'history'
import RootReducer from 'reducers/RootReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

export const history = createBrowserHistory()
const defaultState = {}
const middleware = [thunk, routerMiddleware(history)]

/* eslint-disable no-underscore-dangle */
export const store = createStore(
  RootReducer(history),
  defaultState,
  // http://extension.remotedev.io/
  composeWithDevTools(applyMiddleware(...middleware))
)
/* eslint-enable */

export default store
