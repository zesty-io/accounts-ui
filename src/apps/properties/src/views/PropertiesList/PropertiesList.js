import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'

import styles from './PropertiesList.less'

import PropertiesHeader from '../../components/PropertiesHeader'
import WebsiteCard from '../../components/WebsiteCard'
import WebsiteInvite from '../../components/WebsiteInvite'
import WebsiteCreate from '../../components/WebsiteCreate'

import PropertyOverview from '../PropertyOverview'

class Properties extends Component {
  render() {
    return (
      <section className={styles.Websites}>
        <PropertiesHeader />
        <main className={styles.siteListWrap}>
          {Object.keys(this.props.sitesFiltered).length ? (
            <div className={styles.siteList} id="siteListWrapper">
              {Object.keys(this.props.sites)
                .filter(
                  zuid =>
                    this.props.sites[zuid] && this.props.sites[zuid].inviteZUID
                )
                .map(zuid => {
                  return (
                    <WebsiteInvite key={zuid} site={this.props.sites[zuid]} />
                  )
                })}

              {Object.keys(this.props.sitesFiltered)
                .filter(
                  zuid =>
                    this.props.sitesFiltered[zuid] &&
                    !this.props.sitesFiltered[zuid].inviteZUID
                )
                .map((zuid, i) => {
                  // TODO: remove when windowing is functional
                  if (i >= 100) {
                    return
                  }
                  return (
                    <WebsiteCard
                      key={zuid}
                      site={this.props.sitesFiltered[zuid]}
                    />
                  )
                })}
              <Route path="/properties/:hash" component={PropertyOverview} />
              <Route
                path="/properties/invite/:hash"
                component={PropertyOverview}
              />
            </div>
          ) : this.props.sites === null ? (
            <div className={styles.siteList}>
              <WebsiteCreate />
            </div>
          ) : (
            <div className={styles.LoadingSites}>
              <h2>Loading Your Web Properties</h2>
              <Loader />
            </div>
          )}
        </main>
      </section>
    )
  }
}
export default connect(state => state)(Properties)
