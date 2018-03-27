import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import styles from './WebsiteOverview.less'

import UserAccess from "./UserAccess";
import CompanyAccess from "./CompanyAccess";
import Actions from "./Actions";
import Domain from "./Domain";
import Stats from "./Stats";
import Blueprint from "./Blueprint";
import Permissions from "./Permissions";

import { getSiteDetails } from '../../store'

import { fetchSiteUsers } from '../../store/sitesUsers'
import { fetchSiteCompanies } from '../../store/sitesCompanies'
import { fetchBlueprint } from '../../store/blueprints'
import { inviteData } from '../../store/invite'

class WebsiteOverview extends Component {
  componentDidMount() {
    this.props.dispatch(getSiteDetails())
    this.props.dispatch(fetchSiteUsers(this.props.userZuid, this.props.ZUID))
    this.props.dispatch(
      fetchSiteCompanies(this.props.userZuid, this.props.ZUID)
    )
    this.props.dispatch(fetchBlueprint(this.props.blueprintID))
    this.props.dispatch(inviteData({ siteZUID: this.props.ZUID }))
  }
  render() {
    return (
      <section className={styles.WebsiteOverviewWrap}>
        {this.props.name ? (
          <article className={styles.WebsiteOverview}>
            <header className={styles.WebsiteOverviewHeader}>
              <Link className={styles.close} to="/properties/">
                <i className="fa fa-times-circle-o" aria-hidden="true" />Close
              </Link>
              <h1 className={styles.name}>
                {this.props.name}&nbsp;
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
              <article className={styles.card}>
                <h2>
                  <i className="fa fa-line-chart" aria-hidden="true" />&nbsp;
                  Monthly Usage
                </h2>
                <Stats site={this.props.ZUID} />
              </article>
              {/* <article className={styles.card}>
                <h2>
                  <i className="fa fa-list" aria-hidden="true" />
                  &nbsp;Recent Site Actions
                </h2>
                <Actions site={this.props} />
              </article> */}
              <article className={styles.card}>
                <h2>
                  <i className="fa fa-users" aria-hidden="true" />
                  &nbsp;Permissions
                </h2>
                <Permissions site={this.props} />
              </article>
              <article className={styles.card}>
                <h2>
                  <i className="fa fa-users" aria-hidden="true" />
                  &nbsp;User Access
                </h2>
                <UserAccess site={this.props} />
              </article>
              <article className={styles.card}>
                <h2>
                  <i className="fa fa-building" aria-hidden="true" />
                  &nbsp;Company Access
                </h2>
                <CompanyAccess />
              </article>
              <article className={styles.card}>
                <h2>
                  <i className="fa fa-file-code-o" aria-hidden="true" />
                  &nbsp;Blueprint
                </h2>
                <Blueprint site={this.props} />
              </article>
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
