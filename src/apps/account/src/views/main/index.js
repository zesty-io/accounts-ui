import React, { Component } from 'react'
import { NavLink, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { ErrorBoundary } from './err'

import Blueprints from '../Blueprints'
import EditBlueprint from '../EditBlueprint'
import Security from '../Security'
import Account from '../Account'

import styles from './styles.less'

import { getSettings } from '../../store'

class Settings extends Component {
  componentDidMount() {
    this.props.dispatch(getSettings())
  }
  render() {
    return (
      <ErrorBoundary>
        {Object.keys(this.props.profile).length ? (
          <section className={styles.settings}>
            <ul>
              <li>
                <NavLink to="/settings/account">Account</NavLink>
              </li>
              <li>
                <NavLink to="/settings/security">Security</NavLink>
              </li>
              <li>
                <NavLink to="/settings/blueprints">Blueprints</NavLink>
              </li>
            </ul>
            <div className={styles.content}>
              <Switch>
                <Route path="/settings/account" component={Account} />
                <Route path="/settings/security" component={Security} />
                <Route path="/settings/blueprints/:id" component={EditBlueprint} />
                <Route path="/settings/blueprints" component={Blueprints} />
              </Switch>
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
