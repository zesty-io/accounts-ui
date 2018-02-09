import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Switch, Redirect, Route} from 'react-router-dom'

import styles from './shell.less'

import GlobalHeader from '../../components/GlobalHeader'

import {getUser} from '../../store/user'

class Shell extends Component {
  componentWillMount () {
    // TODO how do I get the id?
    this.props.dispatch(getUser('5-44ccc74-6gc353'))
  }
  render () {
    return (
      <section className={styles.shell}>
        <GlobalHeader user={this.props.user} />
        <Switch>
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/properties' component={Properties} />
          {/* <Route path="/properties/create" component={WebsiteCreate} /> */}
          <Route path='/settings' component={Settings} />

          <Redirect from='/' to='/dashboard' />
          {/* TODO: handle no match */}
        </Switch>
      </section>
    )
  }
}

export default connect(state => state)(Shell)
