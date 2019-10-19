import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'
import cx from 'classnames'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

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
import { fetchUser } from '../../store/user'
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

  componentDidUpdate(prevProps) {
    // NOTE: in order to have access to this information, you will need
    // to wrap this component in the `withRouter` HOC

    const {
      location: { pathname }
    } = this.props
    const previousLocation = prevProps.location.pathname

    if (window.Appcues !== undefined) {
      if (pathname !== previousLocation) {
        window.Appcues.page()
      }

      window.Appcues.identify(
        prevProps.user.ZUID, // unique, required
        {
          // recommended (optional) properties

          createdAt: prevProps.user.createdAt, // Unix timestamp of user signup date
          purchasedAd: null, // Unix timestamp of account purchase date (leave null if empty)
          planTier: 'uknn', // Current user’s plan tier
          role: 'unkwn', // Current user’s role or permissions
          accountId: prevProps.user.ID, // Current user's account ID
          firstName: prevProps.user.firstName, // current user's first name
          lastName: prevProps.user.lastName, // current user's first name

          // additional suggestions

          email: prevProps.user.email // Current user's email
        }
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

const AppWithRouter = withRouter(App)

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
            <AppWithRouter user={props.user} dispatch={props.dispatch} />
          </LoadUser>
        </Switch>
      </React.Fragment>
    )
  })
)
