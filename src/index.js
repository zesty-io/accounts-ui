import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {BrowserRouter, Redirect, Route} from 'react-router-dom'

import {store} from './reducers'

import App from './views/app'
import Dashboard from './views/dashboard'
import Login from './views/Login'

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter basename="/z">
      <Route path="/" component={App}>
        <Route path="/dashboard" component={Dashboard} />
      </Route>
    </BrowserRouter>
  </Provider>
), document.getElementById('app'))


const PrivateRoute = ({component, ...rest}) => {
  return class extends React.Component {
    constructor() {
      super()
      console.log('PrivateRoute:constructor', this)
    }
    render() {
      return <Route {...rest} component={App} />
    }
  }
}



// const PrivateRoute = ({ component, ...rest }) => (
//   <Route {...rest} render={props => (
//     fakeAuth.isAuthenticated ? (
//       React.createElement(component, props)
//     ) : (
//       <Redirect to={{
//         pathname: '/login',
//         state: { from: props.location }
//       }}/>
//     )
//   )}/>
// )

// const fakeAuth = {
//   isAuthenticated: false,
//   authenticate(cb) {
//     this.isAuthenticated = true
//     setTimeout(cb, 100) // fake async
//   },
//   signout(cb) {
//     this.isAuthenticated = false
//     setTimeout(cb, 100)
//   }
// }
