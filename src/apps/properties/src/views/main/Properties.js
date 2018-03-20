import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import styles from './Websites.less'

import PropertiesList from '../PropertiesList'
import PropertyCreate from '../PropertyCreate'
import PropertyBlueprint from '../PropertyBlueprint'

class Properties extends Component {
  render() {
    return (
      <section className={styles.Websites}>
        <Switch>
          <Route
            exact
            path="/properties/create/blueprint"
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
