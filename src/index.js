import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {BrowserRouter, Redirect, Route} from 'react-router-dom'

import {store} from './reducers'

import App from './views/app'
import Login from './views/Login'
import Dashboard from './views/dashboard'
import Settings from './views/settings'
import Websites from './views/websites'

class PrivateRoute extends React.Component {
  render() {
    return (this.props.loggedIn)
      ? this.props.children
      : <Redirect to="/login"></Redirect>
  }
}
PrivateRoute.defaultProps = {
  loggedIn: true
}

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Route path="/login" component={Login} />
        <PrivateRoute>
          <Route path="/" component={App}>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/sites" component={Websites} />
            <Route path="/settings" component={Settings} />
          </Route>
        </PrivateRoute>
      </div>


      {/* <App>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/sites" component={Websites} />
        <Route path="/settings" component={Settings} />
      </App> */}
      {/* <Route children={({match, ...rest}) => {
        console.log('match', match);
        console.log('rest', rest);
        return (
          <App>
            <Route path="/login" component={Login} />
            <PrivateRoute>
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/sites" component={Websites} />
              <Route path="/settings" component={Settings} />
            </PrivateRoute>
          </App>
        )
      }}></Route> */}
      {/* <Route path="/" component={App}>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/sites" component={Websites} />
        <Route path="/settings" component={Settings} />
      </Route> */}
    </BrowserRouter>
  </Provider>
), document.getElementById('root'))








// const PrivateRoute = ({component, ...rest}) => {
//   return class extends React.Component {
//     constructor() {
//       super()
//       console.log('PrivateRoute:constructor', this)
//     }
//     componentWillUpdate() {
//       this.props.loggedIn = false
//     }
//     // render() {
//     //   return <Route {...rest} component={App} />
//     // }
//     render() {
//       return (this.props.loggedIn)
//         ? this.props.children
//         : <Redirect to="/login"></Redirect>
//     }
//   }
// }



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
