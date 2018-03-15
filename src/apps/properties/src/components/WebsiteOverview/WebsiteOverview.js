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

class WebsiteOverview extends Component {
  componentDidMount() {
    this.props.dispatch(getSiteDetails())
  }
  render() {
    return (
      <section className={styles.WebsiteOverviewWrap}>
      {this.props.AccountName ?
        <article className={styles.WebsiteOverview}>
          <Link to="/properties/">
            <i className="fa fa-times-circle-o" aria-hidden="true" />
          </Link>
          <header>
            <h1>{this.props.AccountName}</h1>
            <h2>
              {this.props.domain ? (
                this.props.domain
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
            <Stats site={this.props} />
            <h2>Recent Site Actions</h2>
            <Actions site={this.props} />
            <h2>User Access</h2>
            <UserAccess site={this.props} />
            <h2>Company Access</h2>
            <CompanyAccess site={this.props} />
            <h2>Blueprint</h2>
            <Blueprint site={this.props} />
          </main>
        </article>: <h3>loading</h3>}
      </section>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return { ...state.sites[ownProps.match.params.hash] }
}
export default withRouter(connect(
  mapStateToProps
)(WebsiteOverview))
