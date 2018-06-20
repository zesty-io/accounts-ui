import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'

import { store } from './store'
import { verifyAuth } from './store/auth'

import App from './views/App'

let unsubscribe = store.subscribe(() => {
  let state = store.getState()
  if (!state.auth.checking) {
    ReactDOM.render(
      <Provider store={store}>
        <BrowserRouter>
          <Route component={App} />
        </BrowserRouter>
      </Provider>,
      document.getElementById('root')
    )
  }
})

store.dispatch(verifyAuth(unsubscribe))
