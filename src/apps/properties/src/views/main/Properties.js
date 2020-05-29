import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import styles from './Websites.less'

import { fetchSites, fetchSitesWithInvites } from '../../store/sites'
import { fetchSystemRoles } from '../../../../../shell/store/systemRoles'
import { notify } from '../../../../../shell/store/notifications'

import PropertiesList from '../PropertiesList'
import PropertyCreate from '../PropertyCreate'
import PropertyBlueprint from '../PropertyBlueprint'
import PropertyOverview from '../PropertyOverview'

import { WithLoader } from '@zesty-io/core/WithLoader'

class Properties extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loadingSites: true,
      loadingInvitedSites: true
    }
  }
  componentDidMount() {
    console.log('hacemos la carga inicial')
    this.props
      .dispatch(fetchSites())
      .then(() => {
        this.setState({ loadingSites: false })
      })
      .catch(() => {
        this.props.dispatch(
          notify({
            message: 'There was a problem fetching your instances',
            type: 'error'
          })
        )
      })
    this.props
      .dispatch(fetchSitesWithInvites())
      .then(() => {
        this.setState({ loadingInvitedSites: false })
      })
      .catch(() => {
        this.props.dispatch(
          notify({
            message: 'There was a problem fetching your instances',
            type: 'error'
          })
        )
      })
    this.props.dispatch(fetchSystemRoles())
  }
  render() {
    document.title = 'Accounts: Instances'
    return (
      <section className={styles.Websites}>
        <WithLoader
          condition={
            !this.state.loadingSites && !this.state.loadingInvitedSites
          }
          message="Loading Your Instances">
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
