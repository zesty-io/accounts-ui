import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import styles from './Websites.less'

import {ErrorBoundary} from './err'
import PropertiesList from '../PropertiesList'
import PropertyCreate from '../PropertyCreate'

import { getSites } from '../../store'

class Properties extends Component {
  componentDidMount() {
    this.props.dispatch(getSites())
  }
  render() {
    return (
      <ErrorBoundary>
      <section className={styles.Websites}>
        <Switch>
          <Route exact path='/properties/create' component={PropertyCreate} />
          <Route path='/properties' component={PropertiesList} />
        </Switch>
      </section>
      </ErrorBoundary>
    )
  }
}
export default connect(state => state)(Properties)
