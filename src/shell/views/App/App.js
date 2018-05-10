import { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, Route, Switch, withRouter } from 'react-router-dom'

import Login from '../Login'
import TwoFactor from '../TwoFactor'
import Signup from '../Signup'
import ResetPasswordStart from '../ResetPasswordStart'
import ResetPasswordEnd from '../ResetPasswordEnd'
import VerifyEmail from '../VerifyEmail'

import NotFound from '../../../shell/components/NotFound'

import AppHeader from '../../components/AppHeader'
import AppError from '../../components/AppError'
import Notify from '../../components/Notify'
import Modal from '../../components/Modal'
import Confirm from '../../components/Confirm'

import styles from './App.less'
import { fetchUser } from '../../store/user'
import { verifyAuth } from '../../store/auth'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(fetchUser(this.props.user.ZUID))
    setInterval(() => {
      this.props.dispatch(verifyAuth())
    }, 60000)
  }
  render() {
    return (
      <section className={styles.AppShell}>
        <AppHeader user={this.props.user} dispatch={this.props.dispatch} />
        <AppError>
          <Notify />
          <Modal />
          <Confirm />
          <section className={styles.AppMain}>
            {this.props.user.email ? (
              <Switch>
                <Route path="/properties" component={Properties} />
                <Route path="/settings" component={Settings} />
                <Route path="/support" component={Support} />
                <Route path="/teams" component={Teams} />
                <Redirect exact from="/" to="/properties" />
                <Route component={NotFound} />
              </Switch>
            ) : (
              <div className={styles.loaderWrap}>
                <h2>Loading Your Account</h2>
                <Loader />
              </div>
            )}
          </section>
        </AppError>
      </section>
    )
  }
}
let AppInstance = connect(state => state)(App)

class Shell extends Component {
  render() {
    return (
      <div>
        <Switch>
          {this.props.auth.valid ? (
            <Route path="/" component={AppInstance} />
          ) : null}
          <React.Fragment>
            <Switch>
              <Route path="/login/2fa" component={TwoFactor} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route
                path="/reset-password-confirm"
                component={ResetPasswordEnd}
              />
              <Route path="/reset-password" component={ResetPasswordStart} />
              <Route path="/verify-email" component={VerifyEmail} />
              <Redirect from="/" to="/login" />
            </Switch>
          </React.Fragment>
        </Switch>
      </div>
    )
  }
}
export default connect(state => state)(Shell)
