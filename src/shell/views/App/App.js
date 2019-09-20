import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'
import cx from 'classnames'
import { withRouter } from 'react-router-dom'

import Login from '../Login'
import Logout from '../Logout'
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
import { notify } from '../../store/notifications'

import { WithLoader } from '@zesty-io/core/WithLoader'

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
            'Are you interested in using developer features, such as access to blueprints? You can change this any time in your account settings.',
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
      <section className={cx(styles.AppShell, styles.bodyText)}>
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

class LoadUser extends Component {
  __mounted = false

  state = {
    loadingUser: true
  }

  componentDidMount() {
    this.__mounted = true
    this.props
      .dispatch(fetchUser(this.props.userZUID))
      .then(user => {
        if (this.__mounted) {
          Raven.setUserContext(user)
          bugsnagClient.user = user
          this.setState({
            loadingUser: false
          })
        }
      })
      .catch(err => {
        console.error(err)
        this.props.dispatch(
          notify({
            message: `Error fetching user`,
            type: 'error'
          })
        )
      })
  }
  componentWillUnmount() {
    this.__mounted = false
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

export default withRouter(
  connect(state => state)(function Shell(props) {
    return (
      <React.Fragment>
        <Switch>
          <Route path="/logout" component={Logout} />
          <Route path="/login/2fa" component={TwoFactor} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/reset-password-confirm" component={ResetPasswordEnd} />
          <Route path="/reset-password" component={ResetPasswordStart} />
          <Route path="/verify-email" component={VerifyEmail} />
          <Route path="/resend-email" component={ResendEmail} />

          <LoadUser
            auth={props.auth.valid}
            userZUID={props.user.ZUID}
            dispatch={props.dispatch}>
            {props.user.verifiedEmails && props.user.verifiedEmails.length ? (
              <App user={props.user} dispatch={props.dispatch} />
            ) : (
              <Redirect to="/verify-email" />
            )}
          </LoadUser>
        </Switch>
      </React.Fragment>
    )
  })
)
