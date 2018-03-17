import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import styles from './WebsiteOverview.less'

import UserAccess from './UserAccess'
import CompanyAccess from './CompanyAccess'
import Actions from './Actions'
import Domain from './Domain'
import Stats from './Stats'
import Blueprint from './Blueprint'

import { getSiteDetails } from '../../store'

import { fetchSiteUsers } from '../../store/sitesUsers'
import { fetichSiteCompanies } from '../../store/sitesCompanies'
import { fetchBlueprint } from '../../store/blueprints'

class WebsiteOverview extends Component {
  componentDidMount() {
    this.props.dispatch(getSiteDetails())
    this.props.dispatch(fetchSiteUsers(this.props.userZuid, this.props.ZUID))
    this.props.dispatch(
      fetichSiteCompanies(this.props.userZuid, this.props.ZUID)
    )
    this.props.dispatch(fetchBlueprint(this.props.BlueprintID))
  }
  render() {
    return (
      <section className={styles.WebsiteOverviewWrap}>
        {this.props.Name ? (
          <article className={styles.WebsiteOverview}>
            <header>
              <Link className={styles.close} to="/properties/">
                <i className="fa fa-times-circle-o" aria-hidden="true" />Close
              </Link>
              <h1 className={styles.name}>
                {this.props.Name}&nbsp;
                <i className="fa fa-pencil" aria-hidden="true" />
              </h1>
              <h2 className={styles.domain}>
                {this.props.domain ? (
                  <span>
                    {this.props.domain}&nbsp;
                    <i className="fa fa-pencil" aria-hidden="true" />
                  </span>
                ) : (
                  <Button>
                    <i className={cx('fa fa-cog')} aria-hidden="true" />Setup
                    Domain
                  </Button>
                )}
              </h2>
            </header>
            <main>
              <h2>Month Requests</h2>
              <Stats />
              <h2>Recent Site Actions</h2>
              {/* <Actions site={this.props} /> */}
              <h2>User Access</h2>
              <UserAccess />
              <h2>Company Access</h2>
              <CompanyAccess />
              <h2>Blueprint</h2>
              <Blueprint site={this.props} />
            </main>
          </article>
        ) : (
          <section className={styles.Loading}>
            <h3>Loading Site</h3>
            <Loader />
          </section>
        )}
      </section>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...state.sites[ownProps.match.params.hash],
    userZuid: state.user.zuid
  }
}
export default withRouter(connect(mapStateToProps)(WebsiteOverview))
