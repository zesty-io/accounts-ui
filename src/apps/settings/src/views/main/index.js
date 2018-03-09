import React, { Component } from 'react'
import {Switch, Route} from 'react-router-dom'
import {connect} from 'react-redux'

// import a component to display account settings in the subroute
import SettingsBar from '../SettingsBar'
import Profile from '../Profile'
import Blueprints from '../Blueprints'
import Email from '../Email'
import Password from '../Password'
import Security from '../Security'

import {getSettings} from '../../store'

class Settings extends Component {
  componentDidMount() {
    this.props.dispatch(getSettings())
  }
  render () {
    return (
      <section id='settings'>
      <SettingsBar />
        {
          this.props.settings ?
          <Switch>
          <Route path='/settings/profile' component={Profile} />
          <Route path='/settings/blueprints' component={Blueprints} />
          <Route path='/settings/email' component={Email} />
          <Route path='/settings/password' component={Password} />
          <Route path='/settings/security' component={Security} />
        </Switch>
        :
        <p>loading</p>
        }
      </section>
    )
  }
}

export default connect(state => state)(Settings)

// mock fetching settings, plug in said settings.