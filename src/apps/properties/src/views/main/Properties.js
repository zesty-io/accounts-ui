import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import styles from './Websites.less'

import { fetchSites } from '../../store/sites'

import PropertiesList from '../PropertiesList'
import PropertyCreate from '../PropertyCreate'
// import PropertyCreateFirst from '../PropertyCreateFirst'
import PropertyBlueprint from '../PropertyBlueprint'

class Properties extends Component {
  componentWillMount() {
    if (this.props.user.lastLogin === null) {
      window.location = '/properties/create'
    } else {
      this.props.dispatch(fetchSites())
    }
  }
  render() {
    return (
      <section className={styles.Websites}>
        <Switch>
          <Route
            exact
            path="/properties/:zuid/blueprint"
            component={PropertyBlueprint}
          />
          <Route exact path="/properties/create" component={PropertyCreate} />
          <Route path="/properties" component={PropertiesList} />
        </Switch>
      </section>
    )
  }
}
export default connect(state => state)(Properties)
