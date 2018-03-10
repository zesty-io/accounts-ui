import {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect, Route, Switch} from 'react-router-dom'

import Login from '../Login'

import {GlobalHeader} from '../../components/GlobalHeader'
import styles from './app.less'

import {getUser} from '../../store/user'

class PrivateRoute extends Component {
  render () {
    return (this.props.loggedIn
      ? this.props.children
      : (<Redirect to='/login' />)
    )
  }
}

class Shell extends Component {
  componentDidMount () {
    // TODO how do I get the id?
    this.props.dispatch(getUser(this.props.user.zuid))
  }
  render () {
    return (
      <section className={styles.shell}>
        <GlobalHeader user={this.props.user} dispatch={this.props.dispatch} />
        <Switch>
          {/* <Route path='/dashboard' component={Dashboard} /> */}
          <Route path='/properties' component={Properties} />
          <Route path='/account' component={Account} />
          <Route path='/dashboard' component={Dashboard} />
          <Redirect from='/' to='/properties' />
          {/* TODO: handle no match */}
        </Switch>
      </section>
    )
  }
}
let AppShell = connect(state => state)(Shell)

class App extends Component {
  render () {
    return (
      <div>
        <PrivateRoute loggedIn={this.props.auth.valid}>
          <Route path='/' component={AppShell} />
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
export default connect(state => state)(App)
