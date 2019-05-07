import React from 'react'
import ReactDOM from 'react-dom'
import App from 'components/App'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import store, { history } from 'store/index'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-block-ui/style.css'
import 'styles/index.css'

const render = Component => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Component />
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
  )
}

render(App)
