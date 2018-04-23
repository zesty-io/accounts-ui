import React, { Component } from 'react'
import { NavLink, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { ErrorBoundary } from './err'

import EditBlueprint from '../EditBlueprint'
import BlueprintCreate from '../BlueprintCreate'

import Profile from './components/Profile'
import Email from './components/Email'
import Password from './components/Password'
import TwoFactorOptions from './components/TwoFactorOptions'
import Blueprints from './components/Blueprints'

import styles from './styles.less'

import { fetchUser } from '../../../../../shell/store/user'

class Settings extends Component {
  componentDidMount() {
    this.props.user.ZUID && this.props.dispatch(fetchUser(this.props.user.ZUID))
  }
  render() {
    return (
      <ErrorBoundary>
        {Object.keys(this.props.user).length ? (
          <section className={styles.settings}>
            {/* <div className={styles.content}>
              <Switch>
                <Route path="/settings/account" component={Account} />
                <Route path="/settings/security" component={Security} />
                <Route
                  path="/settings/blueprints/create"
                  component={BlueprintCreate}
                />
                <Route
                  path="/settings/blueprints/:id"
                  component={EditBlueprint}
                />
                <Route path="/settings/blueprints" component={Blueprints} />
              </Switch>
            </div> */}

            <Switch>
              <Route
                path="/settings/blueprints/create"
                component={BlueprintCreate}
              />
              <Route
                path="/settings/blueprints/:id"
                component={EditBlueprint}
              />
            </Switch>

            <div className={styles.setting}>
              <h1>Your Account Settings</h1>
              <div className={styles.SettingCards}>
                <Profile />
                <Email />
                <Password />
                <TwoFactorOptions />
              </div>
            </div>

            <div className={styles.setting}>
              <h1>Your Blueprint Settings</h1>
              <Blueprints />
            </div>
          </section>
        ) : (
          <div className={styles.Loading}>
            <h1>Loading Account</h1>
            <Loader />
          </div>
        )}
      </ErrorBoundary>
    )
  }
}

export default connect(state => state)(Settings)
