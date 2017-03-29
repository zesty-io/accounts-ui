import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {BrowserRouter, Redirect, Route} from 'react-router-dom'

import {store} from './reducers'

import App from './views/app'
import Dashboard from './views/dashboard'

ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <PrivateRoute path="/z" component={App}>
              <Route path="/dashboard" component={Dashboard} />
            </PrivateRoute>
        </BrowserRouter>
    </Provider>
), document.getElementById('app'))


//
const PrivateRoute = ({ component, ...rest }) => (
  <Route {...rest} render={props => (
    fakeAuth.isAuthenticated ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100) // fake async
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}
