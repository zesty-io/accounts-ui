import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import styles from './styles.less'

import UserAccess from './UserAccess'
import CompanyAccess from './CompanyAccess'
import Actions from './Actions'
import Domain from './Domain'
import Stats from './Stats'
import Blueprint from './Blueprint'

import { getSiteDetails } from '../../store'
import{ getUsersForSite } from '../../store/siteUsers'
import{ getCompaniesForSite } from '../../store/siteCompanies'

class WebsiteOverview extends Component {
  componentDidMount() {
    this.props.dispatch(getSiteDetails())
    this.props.dispatch(getUsersForSite(this.props.userZuid, this.props.ZUID))
    this.props.dispatch(getCompaniesForSite(this.props.userZuid, this.props.ZUID))
  }
  render() {
    return (
      <section className={styles.WebsiteOverviewWrap}>
        {this.props.AccountName ? (
          <article className={styles.WebsiteOverview}>
            <Link to="/properties/">
              <i className="fa fa-times-circle-o" aria-hidden="true" />
            </Link>
            <header>
              <h1>{this.props.AccountName}</h1>
              <h2>
                {this.props.Domain ? (
                  this.props.Domain
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
              <CompanyAccess site={this.props} />
              <h2>Blueprint</h2>
              {/* <Blueprint site={this.props} /> */}
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
  return { ...state.sites[ownProps.match.params.hash], userZuid: state.user.zuid, }
}
export default withRouter(connect(mapStateToProps)(WebsiteOverview))
