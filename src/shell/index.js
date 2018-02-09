import React from 'react'
import ReactDOM from 'react-dom'
import {Provider, connect} from 'react-redux'
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'

import {store} from './store'
import {verifyAuth} from './store/auth'

import Login from './views/Login'
import Shell from './views/Shell'

class PrivateRoute extends React.Component {
  render () {
    return (this.props.loggedIn
      ? this.props.children
      : (<Redirect to='/login' />)
    )
  }
}

class App extends React.Component {
  componentWillMount () {
    this.props.dispatch(verifyAuth())
  }
  render () {
    return (
      <div>
        <PrivateRoute loggedIn={this.props.auth.valid}>
          <Route path='/' component={Shell} />
        </PrivateRoute>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/create-account' component={Login} />
          <Route path='/reset-password' component={Login} />
          <Route path='/verify-email' component={Login} />
        </Switch>
      </div>
    )
  }
}
let AppShell = connect(state => state)(App)

let unsubscribe = store.subscribe(() => {
  let state = store.getState()
  if (!state.auth.checking) {
    ReactDOM.render((
      <Provider store={store}>
        <BrowserRouter>
          <Route path='/' component={AppShell} />
        </BrowserRouter>
      </Provider>
    ), document.getElementById('root'))
  }
})

store.dispatch(verifyAuth(unsubscribe))
