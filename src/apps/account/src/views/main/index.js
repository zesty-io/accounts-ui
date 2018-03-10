import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { ErrorBoundary } from './err'

// import a component to display account settings in the subroute
import SettingsBar from '../SettingsBar'
import Profile from '../Profile'
import Blueprints from '../Blueprints'
import Email from '../Email'
import Password from '../Password'
import Security from '../Security'

import { getSettings } from '../../store'

class Account extends Component {
  constructor(props) {
    super(props)
    this.state ={
      loading: true
    }
  }
  componentDidMount() {
    this.props.dispatch(getSettings())
  }
  componentWillReceiveProps(next) {
    if(this.props.profile){
      this.setState({loading: false})
    }
  }
  render() {
    if (this.state.loading === false) {
      return (
        <ErrorBoundary>
          <SettingsBar />
          <Switch>
            <div style={{paddingLeft: '25%', }}>
            <Route path='/account/profile' component={Profile} />
            <Route path='/account/blueprints' component={Blueprints} />
            <Route path='/account/email' component={Email} />
            <Route path='/account/password' component={Password} />
            <Route path='/account/security' component={Security} />
            </div>
          </Switch>
        </ErrorBoundary>
      )
    } else {
      return <p>loading</p>
    }

  }
}

export default connect(state => state)(Account)

// mock fetching settings, plug in said settings.