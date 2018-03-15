import React, { Component } from 'react'
import { NavLink, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { ErrorBoundary } from './err'

import Blueprints from '../Blueprints'
import Security from '../Security'
import Account from '../Account'

import styles from './styles.less'

import { getSettings } from '../../store'

class Settings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
  }
  componentDidMount() {
    this.props.dispatch(getSettings())
  }
  componentWillReceiveProps(next) {
    if (this.props.profile) {
      this.setState({ loading: false })
    }
  }
  render() {
    if (this.state.loading === false) {
      return (
        <ErrorBoundary>
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
            <div style={{ paddingLeft: '25%' }}>
              <Switch>
                <Route path="/settings/account" component={Account} />
                <Route path="/settings/security" component={Security} />
                <Route path="/settings/blueprints" component={Blueprints} />
              </Switch>
            </div>
          </section>
        </ErrorBoundary>
      )
    } else {
      return <p>loading</p>
    }
  }
}

export default connect(state => state)(Settings)
