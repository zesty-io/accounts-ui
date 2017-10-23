import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Switch, Redirect, Route} from 'react-router-dom'
import styles from './styles.less'

import GlobalHeader from '../components/GlobalHeader'
import Dashboard from '../views/dashboard'
import Settings from '../views/settings'
import Websites from '../views/Websites'
import WebsiteCreate from '../views/WebsiteCreate'

import {getUser} from '../store/user'

class App extends Component {
  componentWillMount() {
    console.log('componentWillMount')
    // TODO how do I get the id?
    getUser('20473729')
  }
  render() {
    return (
      <section className={styles.app}>
        <GlobalHeader />
        <Switch>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/sites" component={Websites} />
          <Route path="/sites/create" component={WebsiteCreate} />
          <Route path="/settings" component={Settings} />
          <Redirect from='/' to='/dashboard'/>
          {/* TODO: handle no match */}
        </Switch>
      </section>
    )
  }
}

const AppShell = connect(state => state)(App)

export default AppShell
