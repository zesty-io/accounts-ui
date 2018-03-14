import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import styles from './styles.less'

import Access from './Access'
import CompanyAccess from './CompanyAccess'
import Actions from './Actions'
import Overview from './Overview'
import Domain from './Domain'
import Stats from './Stats'
import Blueprint from './Blueprint'

class WebsiteOverview extends Component {
  render() {
    return (
      <section className={styles.WebsiteOverviewWrap}>
        <article className={styles.WebsiteOverview}>
          <Link to="/properties/">
            <i className="fa fa-times-circle-o" aria-hidden="true" />
          </Link>
          <header>
            <h1>{this.props.name}</h1>
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
            <Overview site={this.props} />
            <Stats site={this.props} />
            <h2>Recent Site Actions</h2>
            <Actions site={this.props} />
            <h2>User Access</h2>
            <Access site={this.props} />
            <h2>Company Access</h2>
            <CompanyAccess site={this.props} />
            <h2>Blueprint</h2>
            <Blueprint site={this.props} />

          </main>
        </article>
      </section>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {...state.sites[ownProps.match.params.hash]}
}
export default withRouter(connect(
  mapStateToProps
)(WebsiteOverview))
