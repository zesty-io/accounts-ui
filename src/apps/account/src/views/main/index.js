import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { ErrorBoundary } from './err'

import Account from '../Account'

import styles from './styles.less'
class Settings extends Component {
  render() {
    return (
      <ErrorBoundary>
        <Switch>
          <Route path="/settings/account" component={Account} />
        </Switch>
      </ErrorBoundary>
    )
  }
}

export default connect(state => state)(Settings)
