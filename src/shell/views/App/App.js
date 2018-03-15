import { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'

import Login from '../Login'
import TwoFactor from '../TwoFactor'
import Signup from '../Signup'
import ResetPassword from '../ResetPassword'
import VerifyEmail from '../VerifyEmail'

import AppHeader from '../../components/AppHeader'
import AppError from '../../components/AppError'

import styles from './App.less'
import { getUser } from '../../store/user'
import { verifyAuth } from '../../store/auth'

class Shell extends Component {
  componentDidMount() {
    // TODO how do I get the id?
    this.props.dispatch(getUser(this.props.user.zuid))
    setInterval(() => {
      this.props.dispatch(verifyAuth())
    }, 60000)
  }
  render() {
    return (
      <section className={styles.AppShell}>
        <AppHeader user={this.props.user} dispatch={this.props.dispatch} />
        <AppError>
          <section className={styles.AppMain}>
            <Switch>
              {/* <Route path="/dashboard" component={Dashboard} /> */}
              <Route path="/properties" component={Properties} />
              <Route path="/account" component={Account} />
              {/* <Route path="/messages" component={Messages} /> */}
              <Redirect from="/" to="/properties" />
              {/* TODO: handle no match */}
            </Switch>
          </section>
        </AppError>
      </section>
    )
  }
}
let AppShell = connect(state => state)(Shell)

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          {this.props.auth.valid ? (
            <Route path="/" component={AppShell} />
          ) : null}
          <Route exact path="/login" component={Login} />
          <Route path="/login/2fa" component={TwoFactor} />
          <Route path="/signup" component={Signup} />
          <Route path="/reset-password" component={ResetPassword} />
          <Route path="/verify-email" component={VerifyEmail} />
          <Redirect to="/login" />
        </Switch>
      </div>
    )
  }
}
export default connect(state => state)(App)
