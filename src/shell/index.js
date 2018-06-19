import ReactDOM from 'react-dom'
import Raven from 'react-raven'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'

import { store } from './store'
import { verifyAuth } from './store/auth'

import App from './views/App'

let unsubscribe = store.subscribe(() => {
  let state = store.getState()
  if (!state.auth.checking) {
    ReactDOM.render(
      <React.Fragment>
        <Raven dsn="https://12c3a25b9d4c4442aa93f22dcf39c26a@sentry.io/1229171" />
        <Provider store={store}>
          <BrowserRouter>
            <Route component={App} />
          </BrowserRouter>
        </Provider>
      </React.Fragment>,
      document.getElementById('root')
    )
  }
})

store.dispatch(verifyAuth(unsubscribe))
