import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import styles from './Websites.less'

import { fetchSites } from '../../store/sites'
import { fetchSystemRoles } from '../../../../../shell/store/systemRoles'

import PropertiesList from '../PropertiesList'
import PropertyCreate from '../PropertyCreate'
import PropertyBlueprint from '../PropertyBlueprint'

class Properties extends Component {
  componentWillMount() {
    this.props.dispatch(fetchSites())
    this.props.dispatch(fetchSystemRoles())
  }
  render() {
    return (
      <section className={styles.Websites}>
        <Switch>
          <Route
            exact
            path="/instances/:zuid/blueprint"
            component={PropertyBlueprint}
          />
          <Route exact path="/instances/create" component={PropertyCreate} />
          <Route path="/instances" component={PropertiesList} />
        </Switch>
      </section>
    )
  }
}
export default connect(state => state)(Properties)
