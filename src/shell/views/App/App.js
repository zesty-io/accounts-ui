import { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'
import cx from 'classnames'

import Login from '../Login'
import TwoFactor from '../TwoFactor'
import Signup from '../Signup'
import ResetPasswordStart from '../ResetPasswordStart'
import ResetPasswordEnd from '../ResetPasswordEnd'
import VerifyEmail from '../VerifyEmail'
import ResendEmail from '../ResendEmail'

import NotFound from '../../../shell/components/NotFound'

import AppHeader from '../../components/AppHeader'
import AppError from '../../components/AppError'
import Notify from '../../components/Notify'
import Confirm from '../../components/Confirm'

import styles from './App.less'
import { fetchUser, saveProfile } from '../../store/user'
import { zConfirm } from '../../store/confirm'
import { verifyAuth } from '../../store/auth'

class App extends Component {
  constructor(props) {
    super(props)
    setInterval(() => {
      this.props.dispatch(verifyAuth())
    }, 60000)
  }
  componentDidMount() {
    if (!this.props.user.prefs.hasSelectedDev) {
      this.props.dispatch(
        zConfirm({
          prompt:
            'Are you interested in using developer features, such as access to blueprints? You can change this setting any time in "My Account" under "Preferences"',
          callback: response => {
            if (response) {
              this.props.dispatch({
                type: 'DEV_PREFS',
                payload: 1
              })
              this.props.dispatch(
                saveProfile({
                  websiteCreator: true
                })
              )
            } else {
              this.props.dispatch({
                type: 'DEV_PREFS',
                payload: 0
              })
              this.props.dispatch(
                saveProfile({
                  websiteCreator: false
                })
              )
            }
          }
        })
      )
    }
  }
  render() {
    return (
      <section className={styles.AppShell}>
        <AppHeader />
        <AppError user={this.props.user}>
          <section className={cx('AppMain', styles.AppMain)}>
            <Switch>
              <Route path="/instances" component={Properties} />
              <Route path="/settings" component={Settings} />
              <Route path="/blueprints/:id?" component={Blueprints} />
              <Route path="/support" component={Support} />
              <Route path="/teams" component={Teams} />
              <Redirect exact from="/" to="/instances" />
              <Redirect exact from="/login" to="/instances" />
              <Redirect from="/z/*" to="/instances" />
              <Route component={NotFound} />
            </Switch>
          </section>
          <Notify />
          <Confirm />
        </AppError>
      </section>
    )
  }
}

class VerifyUser extends Component {
  render() {
    if (this.props.verifiedEmails) {
      return this.props.children
    } else {
      return <Redirect to="verify-email" />
    }
  }
}

class LoadUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loadingUser: true
    }
  }
  componentDidMount() {
    this.props.dispatch(fetchUser(this.props.userZUID)).then(user => {
      Raven.setUserContext(user)
      bugsnagClient.user = user
      this.setState({
        loadingUser: false
      })
    })
  }
  render() {
    if (this.props.auth) {
      return (
        <WithLoader
          condition={!this.state.loadingUser}
          message="Finding Your Account">
          {this.props.children}
        </WithLoader>
      )
    } else {
      return <Redirect to="/login" />
    }
  }
}

class Shell extends Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route path="/login/2fa" component={TwoFactor} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/reset-password-confirm" component={ResetPasswordEnd} />
          <Route path="/reset-password" component={ResetPasswordStart} />
          <Route path="/verify-email" component={VerifyEmail} />
          <Route path="/resend-email" component={ResendEmail} />

          <LoadUser
            auth={this.props.auth.valid}
            userZUID={this.props.user.ZUID}
            dispatch={this.props.dispatch}>
            <VerifyUser
              verifiedEmails={
                this.props.user.verifiedEmails &&
                this.props.user.verifiedEmails.length
              }>
              <App user={this.props.user} dispatch={this.props.dispatch} />
            </VerifyUser>
          </LoadUser>
        </Switch>
      </React.Fragment>
    )
  }
}
export default connect(state => state)(Shell)
