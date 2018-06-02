import React, { Component } from 'react'
import { Route } from 'react-router'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import styles from './PropertyOverview.less'

import Users from './components/Users'
import CompanyAccess from './components/CompanyAccess'
import Roles from './components/Roles'
import Blueprint from './components/Blueprint'
import Meta from './components/Meta'
import LaunchWizard from './components/LaunchWizard'

import { fetchSiteUsers, fetchSiteUsersPending } from '../../store/sitesUsers'
import { fetchSiteRoles } from '../../store/sitesRoles'
import { fetchSiteCompanies } from '../../store/sitesCompanies'
import { fetchBlueprint } from '../../store/blueprints'
// import { fetchSite } from '../../store/sites'
// import { updateSite } from '../../store/sites'
// import { notify } from '../../../../../shell/store/notifications'

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
  componentWillReceiveProps(nextProps) {
    if (nextProps.siteZUID !== this.props.siteZUID) {
      this.fetchSiteData(nextProps)
    }
  }
  render() {
    return (
      <article className={styles.PropertyOverview}>
        <header className={styles.PropertyOverviewHeader}>
          <Url
            className={styles.manager}
            target="_blank"
            href={`${CONFIG.MANAGER_URL_PROTOCOL}${
              this.props.site.randomHashID
            }${CONFIG.MANAGER_URL}`}
          >
            <i className="fa fa-external-link" aria-hidden="true" />&nbsp;Instance
            Manager
          </Url>
          <Url
            className={styles.manager}
            target="_blank"
            href={`${CONFIG.PREVIEW_URL_PROTOCOL}${
              this.props.site.randomHashID
            }${CONFIG.PREVIEW_URL}`}
          >
            <i className="fa fa-eye" aria-hidden="true" />&nbsp;Instance Preview
          </Url>
          {this.props.site.domain ? (
            <Url
              className={styles.manager}
              target="_blank"
              href={`http://${this.props.site.domain}`}
            >
              <i className="fa fa-globe" aria-hidden="true" />&nbsp;Live Domain
            </Url>
          ) : null}
        </header>
        <main className={styles.Cards}>
          <WithLoader
            condition={Object.keys(this.props.users).length}
            message="Loading Instance Permissions"
          >
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
                    companies={this.props.companies}
                    siteRoles={this.props.siteRoles}
                    loadingTeams={this.state.loadingTeams}
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
    props.dispatch(fetchSiteUsers(props.siteZUID)).then(() => {
      this.setState({
        loadingUsers: false
      })
    })
    props.dispatch(fetchSiteUsersPending(props.siteZUID)).then(() => {
      this.setState({
        loadingUsersPending: false
      })
    })
    props.dispatch(fetchSiteRoles(props.siteZUID)).then(() => {
      this.setState({
        loadingRoles: false
      })
    })
    props.dispatch(fetchSiteCompanies(props.siteZUID)).then(() => {
      this.setState({
        loadingTeams: false
      })
    })
    props.dispatch(fetchBlueprint(props.site.blueprintID)).then(() => {
      this.setState({
        loadingBlueprint: false
      })
    })
  }
}

export default connect((state, props) => {
  const siteZUID = props.match.params.siteZUID

  let systemRoles = Object.keys(state.systemRoles).reduce((acc, key) => {
    acc.push(state.systemRoles[key])
    return acc
  }, [])

  // Get all non system roles for instance
  let siteRoles = state.sitesRoles[siteZUID] || {}
  siteRoles = Object.keys(siteRoles)
    .reduce((acc, key) => {
      acc.push(siteRoles[key])
      return acc
    }, [])
    .filter(role => !role.systemRole)

  // Determine users permissions for instance
  let isAdmin = false
  if (state.user.staff) {
    isAdmin = true
  } else {
    if (
      state.sitesUsers[siteZUID] &&
      state.sitesUsers[siteZUID][state.user.ZUID]
    ) {
      if (
        state.sitesUsers[siteZUID][state.user.ZUID].role.name === 'Owner' ||
        state.sitesUsers[siteZUID][state.user.ZUID].role.name === 'Admin'
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
    site: state.sites[siteZUID] || {},
    users: state.sitesUsers[siteZUID] || {},
    companies: state.sitesCompanies[siteZUID] || {},
    blueprint: state.sites[siteZUID]
      ? state.blueprints[state.sites[siteZUID].blueprintID] || {}
      : {}
  }
})(PropertyOverview)
