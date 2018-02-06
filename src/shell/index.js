import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {BrowserRouter, Redirect, Route} from 'react-router-dom'

import {store} from './store'

import Login from './views/Login'
import Shell from './views/Shell'

let state = store.getState()
console.log(state)

class PrivateRoute extends React.Component {
  render () {
    return (this.props.loggedIn)
      ? this.props.children
      : <Redirect to='/login' />
  }
}

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Route path='/login' component={Login} />
        <Route path='/create-account' component={Login} />
        <Route path='/reset-password' component={Login} />
        <Route path='/verify-email' component={Login} />
        <PrivateRoute loggedIn={state.authenticated}>
          <Route path='/' component={Shell} />
        </PrivateRoute>
      </div>
    </BrowserRouter>
  </Provider>
), document.getElementById('root'))
