import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import styles from './Websites.less'

import { fetchSites, fetchSitesWithInvites } from '../../store/sites'
import { fetchSystemRoles } from '../../../../../shell/store/systemRoles'

import PropertiesList from '../PropertiesList'
import PropertyCreate from '../PropertyCreate'
import PropertyBlueprint from '../PropertyBlueprint'
import PropertyOverview from '../PropertyOverview'

class Properties extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loadingSites: true
    }
  }
  componentDidMount() {
    this.props.dispatch(fetchSites()).then(() => {
      this.setState({ loadingSites: false })
    })
    this.props.dispatch(fetchSitesWithInvites())
    this.props.dispatch(fetchSystemRoles())
  }
  render() {
    return (
      <section className={styles.Websites}>
        <WithLoader
          condition={!this.state.loadingSites}
          message="Loading Your Instances"
        >
          <Switch>
            <Route
              exact
              path="/instances/:zuid/blueprint"
              component={PropertyBlueprint}
            />
            <Route exact path="/instances/create" component={PropertyCreate} />
            <Route path="/instances" component={PropertiesList} />
          </Switch>
        </WithLoader>
      </section>
    )
  }
}
export default connect(state => state)(Properties)
