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
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/create-account' component={Login} />
          <Route path='/reset-password' component={Login} />
          <Route path='/verify-email' component={Login} />
        </Switch>
        <PrivateRoute loggedIn={this.props.authenticated}>
          <Route path='/' component={Shell} />
        </PrivateRoute>
      </div>
    )
  }
}
let AppShell = connect(state => state)(App)

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <Route path='/' component={AppShell} />
    </BrowserRouter>
  </Provider>
), document.getElementById('root'))
