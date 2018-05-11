import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import styles from './PropertyOverview.less'

import PropertyName from './components/PropertyName'
import Domain from './components/Domain'
import Users from './components/Users'
import CompanyAccess from './components/CompanyAccess'
import Roles from './components/Roles'
import Blueprint from './components/Blueprint'

import { fetchSiteUsers, fetchSiteUsersPending } from '../../store/sitesUsers'
import { fetchSiteRoles } from '../../store/sitesRoles'
import { fetchSiteCompanies } from '../../store/sitesCompanies'
// import { fetchSite } from '../../store/sites'
// import { fetchSiteCollections } from '../../store/sitesCollections'
// import { updateSite } from '../../store/sites'
// import { notify } from '../../../../../shell/store/notifications'

class PropertyOverview extends Component {
  constructor(props) {
    super(props)
    console.log('PropertyOverview: ', props)
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
    // Fetch Users
    this.props.dispatch(fetchSiteUsers(this.props.siteZUID)).then(() => {
      this.setState({
        loadingUsers: false
      })
    })
    // pending users
    this.props.dispatch(fetchSiteUsersPending(this.props.siteZUID)).then(() => {
      this.setState({
        loadingUsersPending: false
      })
    })
    this.props.dispatch(fetchSiteRoles(this.props.siteZUID)).then(() => {
      this.setState({
        loadingRoles: false
      })
    })

    this.props.dispatch(fetchSiteCompanies(this.props.siteZUID)).then(() => {
      this.setState({
        loadingTeams: false
      })
    })
    // this.props.dispatch(fetchSiteCollections(this.props.siteZUID))
    // this.props.dispatch(fetchBlueprint(this.props.site.blueprintID))

    document.addEventListener('keydown', this.close)
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.close)
  }
  render() {
    return (
      <section className={styles.PropertyOverviewWrap}>
        <article className={styles.PropertyOverview}>
          <header className={styles.PropertyOverviewHeader}>
            <Button className={styles.close} onClick={this.close}>
              <i className="fa fa-times-circle-o" aria-hidden="true" /> Close
            </Button>
            <PropertyName name={this.props.site.name} />
            {/* <Domain siteZUID={this.props.site.ZUID} site={this.props.site} /> */}
          </header>
          <main>
            <article className={styles.card}>
              <h2>
                <i className="fa fa-users" aria-hidden="true" />
                &nbsp;User Access
              </h2>
              <Users
                siteZUID={this.props.site.ZUID}
                dispatch={this.props.dispatch}
                users={this.props.users}
                roles={this.props.allRoles}
                loadingUsers={this.state.loadingUsers}
                loadingUsersPending={this.state.loadingUsersPending}
                loadingRoles={this.state.loadingRoles}
              />
            </article>

            <article className={styles.card}>
              <h2>
                <i className="fa fa-building" aria-hidden="true" />
                &nbsp;Company Access
              </h2>
              <CompanyAccess
                companies={this.props.companies}
                loadingTeams={this.state.loadingTeams}
              />
            </article>

            <article className={styles.card}>
              <h2>
                <i className="fa fa-lock" aria-hidden="true" />
                &nbsp;Site Roles
              </h2>
              <Roles
                siteZUID={this.props.siteZUID}
                siteRoles={this.props.siteRoles}
                systemRoles={this.props.systemRoles}
              />
            </article>

            {/* <article className={styles.card}>
              <h2>
                <i className="fa fa-file-code-o" aria-hidden="true" />
                &nbsp;Blueprint
              </h2>
              <Blueprint />
            </article> */}
          </main>
        </article>
      </section>
    )
  }
  close = evt => {
    if (evt.key === 'Escape' || evt.type === 'click') {
      this.props.history.goBack()
    }
  }
}

export default withRouter(
  connect((state, props) => {
    const siteZUID = props.match.params.hash
    return {
      siteZUID,
      systemRoles: state.systemRoles,
      siteRoles: state.sitesRoles[siteZUID] || {},
      allRoles: {
        ...state.systemRoles,
        ...state.sitesRoles[siteZUID]
      },
      site: state.sites[siteZUID] || {},
      users: state.sitesUsers[siteZUID] || {},
      companies: state.sitesCompanies[siteZUID] || {}
    }
  })(PropertyOverview)
)
