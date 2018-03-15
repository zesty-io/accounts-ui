import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import styles from './Websites.less'

import PropertiesList from '../PropertiesList'
import PropertyCreate from '../PropertyCreate'

// import { getSites } from '../../store'

class Properties extends Component {
  // componentDidMount() {
  //   this.props.dispatch(getSites())
  // }
  render() {
    return (
      <section className={styles.Websites}>
        <Switch>
          <Route exact path="/properties/create" component={PropertyCreate} />
          <Route path="/properties" component={PropertiesList} />
        </Switch>
      </section>
    )
  }
}
export default connect(state => state)(Properties)
