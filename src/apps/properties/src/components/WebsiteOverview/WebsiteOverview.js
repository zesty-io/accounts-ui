import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import styles from './WebsiteOverview.less'

import PropertyName from './PropertyName'
import UserAccess from './UserAccess'
import CompanyAccess from './CompanyAccess'
import Actions from './Actions'
import Domain from './Domain'
import Stats from './Stats'
import Blueprint from './Blueprint'
import Roles from './Roles'

import { fetchSite } from '../../store/sites'
// import { fetchSiteRoles } from '../../store/sitesRoles'
// import { fetchSiteCollections } from '../../store/sitesCollections'
// import { updateSite } from '../../store/sites'
import { notify } from '../../../../../shell/store/notifications'

class WebsiteOverview extends Component {
  constructor(props) {
    super(props)
    console.log('WebsiteOverview: ', props)
    // this.state = {
    //   editName: false,
    //   name: '',
    //   editDomain: false
    // }
  }
  componentDidMount() {
    // Fetch Users
    // pending users
    // Fetch Companies
    // Fetch Roles
    // Fetch Collections
    // Fetch Blueprints
    // fetch users first, then fetch pending users
    // this.props
    //   .dispatch(fetchSiteUsers(this.props.userZUID, this.props.ZUID))
    //   .then(users => {
    //     this.props.dispatch(
    //       fetchSiteUsersPending(this.props.userZUID, this.props.ZUID)
    //     )
    //   })
    // this.props.dispatch(
    //   fetchSiteCompanies(this.props.userZUID, this.props.ZUID)
    // )
    // this.props.dispatch(fetchSiteRoles(this.props.userZUID, this.props.ZUID))
    // this.props.dispatch(
    //   fetchSiteCollections(this.props.userZUID, this.props.ZUID)
    // )
    // this.props.dispatch(fetchBlueprint(this.props.blueprintID))
    // this.setState({
    //   name: this.props.name
    // })
  }
  render() {
    return (
      <section className={styles.WebsiteOverviewWrap}>
        <article className={styles.WebsiteOverview}>
          <header className={styles.WebsiteOverviewHeader}>
            <Link className={styles.close} to="/properties/">
              <i className="fa fa-times-circle-o" aria-hidden="true" /> Close
            </Link>
            <PropertyName name={this.props.name} />
            <Domain siteZUID={this.props.ZUID} site={this.props} />
          </header>
          <main>
            <article className={styles.card}>
              <h2>
                <i className="fa fa-users" aria-hidden="true" />
                &nbsp;User Access
              </h2>
              <UserAccess />
            </article>

            {/* <article className={styles.card}>
              <h2>
                <i className="fa fa-building" aria-hidden="true" />
                &nbsp;Company Access
              </h2>
              <CompanyAccess />
            </article> */}

            <article className={styles.card}>
              <h2>
                <i className="fa fa-lock" aria-hidden="true" />
                &nbsp;Site Roles
              </h2>
              <Roles />
            </article>

            <article className={styles.card}>
              <h2>
                <i className="fa fa-file-code-o" aria-hidden="true" />
                &nbsp;Blueprint
              </h2>
              <Blueprint />
            </article>
          </main>
        </article>
      </section>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  // return {
  //   users: state.sitesUsers[ownProps.match.params.hash],
  //   roles: state.sitesRoles[ownProps.match.params.hash],
  //   site: state.sites[ownProps.match.params.hash]
  // }

  return {
    ...state.sites[ownProps.match.params.hash]
  }
}
export default withRouter(connect(mapStateToProps)(WebsiteOverview))
