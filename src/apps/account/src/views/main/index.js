import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { ErrorBoundary } from './err'

import SettingsBar from '../SettingsBar'
import Blueprints from '../Blueprints'
import Security from '../Security'
import Combined from '../Combined'

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
          <div style={{paddingLeft: '25%', }}>
          <Switch>
            <Route path='/account/combined' component={Combined} />
            <Route path='/account/security' component={Security} />
            <Route path='/account/blueprints' component={Blueprints} />
          </Switch>
          </div>
        </ErrorBoundary>
      )
    } else {
      return <p>loading</p>
    }

  }
}

export default connect(state => state)(Account)

// mock fetching settings, plug in said settings.