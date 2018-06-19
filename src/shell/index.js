import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import bugsnag from 'bugsnag-js'
import createPlugin from 'bugsnag-react'

import { store } from './store'
import { verifyAuth } from './store/auth'

const bugsnagClient = bugsnag('7e50d87ea61932f9e3141420402f4eed')
const ErrorBoundary = bugsnagClient.use(createPlugin(React))

import App from './views/App'

let unsubscribe = store.subscribe(() => {
  let state = store.getState()
  if (!state.auth.checking) {
    ReactDOM.render(
      <ErrorBoundary>
        <Provider store={store}>
          <BrowserRouter>
            <Route component={App} />
          </BrowserRouter>
        </Provider>
      </ErrorBoundary>,
      document.getElementById('root')
    )
  }
})

store.dispatch(verifyAuth(unsubscribe))
