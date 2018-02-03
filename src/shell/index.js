import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {BrowserRouter, Redirect, Route} from 'react-router-dom'

import {store} from './store'

import Login from './views/Login'
import Shell from './views/Shell'

class PrivateRoute extends React.Component {
  render () {
    return (this.props.loggedIn)
      ? this.props.children
      : <Redirect to='/login' />
  }
}
PrivateRoute.defaultProps = {
  loggedIn: true
}

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Route path='/login' component={Login} />
        <PrivateRoute>
          <Route path='/' component={Shell} />
        </PrivateRoute>
      </div>
    </BrowserRouter>
  </Provider>
), document.getElementById('root'))

// import React, { Component } from 'react'
// import {connect} from 'react-redux'
// import {Switch, Redirect, Route} from 'react-router-dom'
// import styles from './shell.less'

// import GlobalHeader from './components/GlobalHeader'
// import Dashboard from '../app/views/dashboard'
// import Settings from '../app/views/settings'
// import Websites from '../app/views/Websites'
// import WebsiteCreate from '../app/views/WebsiteCreate'

// // import {getUser} from '../store/user'

// class App extends Component {
//   // componentWillMount() {
//   //   console.log('componentWillMount')
//   //   // TODO how do I get the id?
//   //   getUser('20473729')
//   // }
//   render() {
//     return (
//       <section className={styles.shell}>
//         <GlobalHeader />
//         <Switch>
//           <Route path="/dashboard" component={Dashboard} />
//           <Route path="/sites" component={Websites} />
//           <Route path="/sites/create" component={WebsiteCreate} />
//           <Route path="/settings" component={Settings} />
//           <Redirect from='/' to='/dashboard'/>
//           {/* TODO: handle no match */}
//         </Switch>
//       </section>
//     )
//   }
// }

// const AppShell = connect(state => state)(App)

// export default AppShell
