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
import AccessTokens from './components/AccessTokens'

import { fetchSiteUsers, fetchSiteUsersPending } from '../../store/sitesUsers'
import { fetchSiteRoles } from '../../store/sitesRoles'
import { fetchSiteTeams } from '../../store/sitesTeams'
import { fetchBlueprint } from '../../store/blueprints'
import { fetchDomains } from '../../store/sitesDomains'
import { fetchAccessTokens } from '../../store/sitesAccessTokens'

// import { fetchSite } from '../../store/sites'
// import { updateSite } from '../../store/sites'
import { notify } from '../../../../../shell/store/notifications'

import { WithLoader } from '@zesty-io/core/WithLoader'
import { AppLink } from '@zesty-io/core/AppLink'
import { Url } from '@zesty-io/core/Url'
import { Button } from '@zesty-io/core/Button'

class PropertyOverview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loadingUsers: true,
      loadingRoles: true,
      loadingUsersPending: true,
      loadingTeams: true,
      loadingCollections: true,
      loadingBlueprint: true,
      loadingDomains: true,
      loadingAccessTokens: true,
      customDomains: [],
      liveDomains: []
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

  getCustomDomains = () => {
    const customDomains =
      this.props.domains && Array.isArray(this.props.domains)
        ? this.props.domains.filter(item => {
            const domainParts = item.domain.split('.')
            const customDomain = domainParts
              .slice(Math.max(domainParts.length - 2, 0))
              .join('.')
            return customDomain !== 'zesty.dev' && customDomain !== 'zesty.site'
          })
        : []
    return customDomains
  }

  getDomains = () => {
    this.setState({ ...this.state, liveDomains: this.props.domains })
  }

  render() {
    document.title = `Accounts: ${this.props.site.name}`
    return (
      <article className={styles.PropertyOverview}>
        <header className={styles.PropertyOverviewHeader}>
          <Button kind="secondary" className={styles.manager}>
            {/* only display link to manager if a blueprint has been selected */}
            {this.props.site.blueprintID !== null ? (
              <Url
                target="_blank"
                href={`${CONFIG.MANAGER_URL_PROTOCOL}${this.props.site.randomHashID}${CONFIG.MANAGER_URL}`}>
                <i className="fas fa-edit"></i>&nbsp;Edit Content
              </Url>
            ) : (
              <AppLink to={`/instances/${this.props.site.ZUID}/blueprint`}>
                <i className="fas fa-file-code" aria-hidden="true" />
                &nbsp;Select Blueprint
              </AppLink>
            )}
          </Button>
          <Url
            target="_blank"
            href={`${CONFIG.PREVIEW_URL_PROTOCOL}${this.props.site.randomHashID}${CONFIG.PREVIEW_URL}`}>
            <i className="fa fa-eye" aria-hidden="true" />
            &nbsp;Open Preview
          </Url>
          {this.props.site.domain ? (
            <div
              className={styles.DomainsDropDown}
              onMouseEnter={() => this.getDomains()}>
              <i
                className={`fa fa-globe ${styles.DomainsDropDownBtn}`}
                aria-hidden="true"
              />
              &nbsp;Live Domains
              {this.props.domains && (
                <div className={styles.DomainsDropDownContent}>
                  {this.state.liveDomains.length ? (
                    this.state.liveDomains.map(dom => (
                      <Url
                        key={dom.ZUID}
                        href={`//${dom.domain}`}
                        target="_blank"
                        title="View live domain">
                        {dom.domain}
                      </Url>
                    ))
                  ) : (
                    <span>No domains added</span>
                  )}
                </div>
              )}
            </div>
          ) : null}

          {this.props.isStaff && (
            <Url
              target="_blank"
              href={`${CONFIG.MANAGER_URL_PROTOCOL}${this.props.site.ZUID}${CONFIG.NEW_MANAGER_URL}`}>
              <i className="fas fa-edit"></i>&nbsp;Manager
            </Url>
          )}
        </header>
        <main className={styles.Cards}>
          <WithLoader
            condition={
              !this.state.loadingRoles &&
              !this.state.loadingTeams &&
              !this.state.loadingUsers &&
              !this.state.loadingBlueprint &&
              !this.state.loadingDomains &&
              !this.state.loadingAccessTokens
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
              exact
              render={routeProps => {
                const customDomains = this.getCustomDomains()
                return (
                  customDomains &&
                  customDomains.length === 0 && (
                    <LaunchWizard
                      {...routeProps}
                      isAdmin={this.props.isAdmin}
                      dispatch={this.props.dispatch}
                      site={this.props.site}
                    />
                  )
                )
              }}
            />

            <Route
              path="/instances/:siteZUID"
              render={routeProps => {
                const customDomains = this.getCustomDomains()
                return (
                  <Meta
                    {...routeProps}
                    isAdmin={this.props.isAdmin}
                    dispatch={this.props.dispatch}
                    site={this.props.site}
                    domains={this.props.domains}
                    customDomains={customDomains}
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
                  <AccessTokens
                    {...routeProps}
                    isAdmin={this.props.isAdmin}
                    dispatch={this.props.dispatch}
                    site={this.props.site}
                    accessTokens={this.props.accessTokens}
                    siteRoles={this.props.siteRoles}
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
      loadingBlueprint: true,
      loadingDomains: true,
      loadingAccessTokens: true
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
    props
      .dispatch(fetchDomains(props.siteZUID))
      .then(() => {
        this.setState({
          loadingDomains: false
        })
      })
      .catch(e => {
        this.props.dispatch(
          notify({ message: 'Error fetching domains', type: 'error' })
        )
      })
    props
      .dispatch(fetchAccessTokens(props.siteZUID))
      .then(() => {
        this.setState({
          loadingAccessTokens: false
        })
      })
      .catch(e => {
        this.props.dispatch(
          notify({ message: 'Error fetching access tokens', type: 'error' })
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
    isStaff: state.user.staff,
    site: state.sites[siteZUID] || {},
    users: state.sitesUsers[siteZUID] || {},
    teams: state.sitesTeams[siteZUID] || {},
    blueprint: state.sites[siteZUID]
      ? state.blueprints[state.sites[siteZUID].blueprintID] || {}
      : {},
    domains: state.sitesDomains[siteZUID]
      ? state.sitesDomains[siteZUID].domains
      : [],
    accessTokens: state.sitesAccessTokens[siteZUID]
      ? state.sitesAccessTokens[siteZUID].accessTokens
      : []
  }
})(PropertyOverview)
