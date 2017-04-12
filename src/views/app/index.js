import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Switch, Redirect, Route} from 'react-router-dom'
import styles from './styles.less'
import GlobalHeader from '../../components/GlobalHeader'

import Dashboard from '../dashboard'
import Settings from '../settings'
import Websites from '../websites'

class App extends Component {
  render() {
    return (
      <section className={styles.app}>
        <GlobalHeader />
        <Switch>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/sites" component={Websites} />
          <Route path="/settings" component={Settings} />
          <Redirect from='/' to='/dashboard'/>
          {/* TODO: handle no match */}
        </Switch>
      </section>
    )
  }
}

const AppView = connect(state => state)(App)

export default AppView
