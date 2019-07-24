import React, { Component } from 'react'
import { Route } from 'react-router'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import qs from 'qs'
import styles from './PropertyOverview.less'

import Users from './components/Users'
import CompanyAccess from './components/CompanyAccess'
import Roles from './components/Roles'
import Blueprint from './components/Blueprint'
import Meta from './components/Meta'
import LaunchWizard from './components/LaunchWizard'

import { fetchSiteUsers, fetchSiteUsersPending } from '../../store/sitesUsers'
import { fetchSiteRoles } from '../../store/sitesRoles'
import { fetchSiteTeams } from '../../store/sitesTeams'
import { fetchBlueprint } from '../../store/blueprints'
// import { fetchSite } from '../../store/sites'
// import { updateSite } from '../../store/sites'
// import { notify } from '../../../../../shell/store/notifications'

import { WithLoader } from '@zesty-io/core/WithLoader'
import { AppLink } from '@zesty-io/core/AppLink'
import { Url } from '@zesty-io/core/Url'

class PropertyOverview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loadingUsers: true,
      loadingRoles: true,
      loadingUsersPending: true,
      loadingTeams: true,
      loadingCollections: true,
      loadingBlueprint: true
    }
  }
  componentDidMount() {
    this.fetchSiteData(this.props)
  }
  componentDidUpdate(prevProps) {
    if (this.props.siteZUID !== prevProps.siteZUID) {
      this.fetchSiteData(this.props)
    }
  }
  render() {
    return (
      <article className={styles.PropertyOverview}>
        <header className={styles.PropertyOverviewHeader}>
          {/* only display link to manager if a blueprint has been selected */}
          {this.props.site.blueprintID !== null ? (
            <Url
              className={styles.manager}
              target="_blank"
              href={`${CONFIG.MANAGER_URL_PROTOCOL}${this.props.site.randomHashID}${CONFIG.MANAGER_URL}`}>
              <i className="fa fa-external-link" aria-hidden="true" />
              &nbsp;Open Instance
            </Url>
          ) : (
            <AppLink to={`/instances/${this.props.site.ZUID}/blueprint`}>
              <i className="fa fa-file-code-o" aria-hidden="true" />
              &nbsp;Select Blueprint
            </AppLink>
          )}
          <Url
            className={styles.manager}
            target="_blank"
            href={`${CONFIG.PREVIEW_URL_PROTOCOL}${this.props.site.randomHashID}${CONFIG.PREVIEW_URL}`}>
            <i className="fa fa-eye" aria-hidden="true" />
            &nbsp;Open Preview
          </Url>
          {this.props.site.domain ? (
            <Url
              className={styles.manager}
              target="_blank"
              href={`http://${this.props.site.domain}`}>
              <i className="fa fa-globe" aria-hidden="true" />
              &nbsp;Live Domain
            </Url>
          ) : null}
        </header>
        <main className={styles.Cards}>
          <WithLoader
            condition={
              !this.state.loadingRoles &&
              !this.state.loadingTeams &&
              !this.state.loadingUsers &&
              !this.state.loadingBlueprint
            }
            message="Checking Instance Permissions">
            <Route
              path="/instances/:siteZUID/launch"
              render={routeProps => {
                return (
                  <LaunchWizard
                    {...routeProps}
                    isAdmin={this.props.isAdmin}
                    dispatch={this.props.dispatch}
                    site={this.props.site}
                  />
                )
              }}
            />

            <Route
              path="/instances/:siteZUID"
              render={routeProps => {
                return (
                  <Meta
                    {...routeProps}
                    isAdmin={this.props.isAdmin}
                    dispatch={this.props.dispatch}
                    site={this.props.site}
                  />
                )
              }}
            />

            <Route
              path="/instances/:siteZUID"
              render={routeProps => {
                return (
                  <Users
                    {...routeProps}
                    isAdmin={this.props.isAdmin}
                    isOwner={this.props.isOwner}
                    siteZUID={this.props.site.ZUID}
                    dispatch={this.props.dispatch}
                    users={this.props.users}
                    siteRoles={this.props.siteRoles}
                    loadingUsers={this.state.loadingUsers}
                    loadingUsersPending={this.state.loadingUsersPending}
                    loadingRoles={this.state.loadingRoles}
                  />
                )
              }}
            />

            {/* Custom roles are on pause until legacy cuts over */}
            {/* <Route
              path="/instances/:siteZUID"
              render={routeProps => {
                return (
                  <Roles
                    {...routeProps}
                    dispatch={this.props.dispatch}
                    siteZUID={this.props.siteZUID}
                    userZUID={this.props.userZUID}
                    siteRoles={this.props.siteRoles}
                    systemRoles={this.props.systemRoles}
                  />
                )
              }}
            /> */}

            <Route
              path="/instances/:siteZUID"
              render={routeProps => {
                return (
                  <CompanyAccess
                    {...routeProps}
                    isAdmin={this.props.isAdmin}
                    dispatch={this.props.dispatch}
                    teams={this.props.teams}
                    users={this.props.users}
                    siteRoles={this.props.siteRoles}
                    loadingTeams={this.state.loadingTeams}
                    siteZUID={this.props.siteZUID}
                  />
                )
              }}
            />

            <Route
              path="/instances/:siteZUID"
              render={routeProps => {
                return (
                  <Blueprint
                    {...routeProps}
                    isAdmin={this.props.isAdmin}
                    loadingBlueprint={this.state.loadingBlueprint}
                    siteZUID={this.props.siteZUID}
                    blueprint={this.props.blueprint}
                    dispatch={this.props.dispatch}
                  />
                )
              }}
            />
          </WithLoader>
        </main>
      </article>
    )
  }
  fetchSiteData(props) {
    this.setState({
      loadingUsers: true,
      loadingRoles: true,
      loadingUsersPending: true,
      loadingTeams: true,
      loadingCollections: true,
      loadingBlueprint: true
    })
    props
      .dispatch(fetchSiteUsers(props.siteZUID))
      .then(() => {
        this.setState({
          loadingUsers: false
        })
      })
      .catch(() => {
        this.props.dispatch(
          notify({ message: 'Error fetching users', type: 'error' })
        )
      })
    props
      .dispatch(fetchSiteUsersPending(props.siteZUID))
      .then(() => {
        this.setState({
          loadingUsersPending: false
        })
      })
      .catch(() => {
        this.props.dispatch(
          notify({ message: 'Error fetching pending users', type: 'error' })
        )
      })
    props
      .dispatch(fetchSiteRoles(props.siteZUID))
      .then(() => {
        this.setState({
          loadingRoles: false
        })
      })
      .catch(() => {
        this.props.dispatch(
          notify({ message: 'Error fetching roles', type: 'error' })
        )
      })
    props
      .dispatch(fetchSiteTeams(props.siteZUID))
      .then(() => {
        this.setState({
          loadingTeams: false
        })
      })
      .catch(() => {
        this.props.dispatch(
          notify({ message: 'Error fetching teams', type: 'error' })
        )
      })
    // validity check blueprint ID before fetching
    if (parseInt(props.site.blueprintID)) {
      props
        .dispatch(fetchBlueprint(props.site.blueprintID))
        .then(() => {
          this.setState({
            loadingBlueprint: false
          })
        })
        .catch(() => {
          this.props.dispatch(
            notify({ message: 'Error fetching blueprints', type: 'error' })
          )
        })
    } else {
      this.setState({ loadingBlueprint: false })
    }
  }
}

export default connect((state, props) => {
  const siteZUID = props.match.params.siteZUID

  const systemRoles = Object.keys(state.systemRoles).reduce((acc, key) => {
    acc.push(state.systemRoles[key])
    return acc
  }, [])

  // Get all non system roles for instance
  let siteRoles = state.sitesRoles[siteZUID] || {}
  siteRoles = Object.keys(siteRoles)
    .filter(ZUID => siteRoles[ZUID].systemRoleZUID !== '31-908bbbd2b6-n5t9hs')
    .reduce((acc, ZUID) => {
      acc.push(siteRoles[ZUID])
      return acc
    }, [])

  // Determine users permissions for instance
  let isAdmin = false
  let isOwner = false
  if (state.user.staff) {
    isOwner = true
    isAdmin = true
  } else {
    if (
      state.sitesUsers[siteZUID] &&
      state.sitesUsers[siteZUID][state.user.ZUID] &&
      state.sitesUsers[siteZUID][state.user.ZUID].role
    ) {
      if (state.sitesUsers[siteZUID][state.user.ZUID].role.systemRole.super) {
        isOwner = true
        isAdmin = true
      } else if (
        state.sitesUsers[siteZUID][state.user.ZUID].role.systemRole.grant
      ) {
        isAdmin = true
      }
    }
  }

  return {
    siteZUID,
    systemRoles,
    siteRoles,
    userZUID: state.user.ZUID,
    isAdmin,
    isOwner,
    site: state.sites[siteZUID] || {},
    users: state.sitesUsers[siteZUID] || {},
    teams: state.sitesTeams[siteZUID] || {},
    blueprint: state.sites[siteZUID]
      ? state.blueprints[state.sites[siteZUID].blueprintID] || {}
      : {}
  }
})(PropertyOverview)
