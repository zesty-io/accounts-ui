import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import LazyLoad from 'react-lazyload'

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
        <main className={styles.siteList} id="siteListWrapper">
          {this.props.sites.length ? (
            <React.Fragment>
              {this.props.sitesInvited.map(site => {
                return <WebsiteInvite key={site.ZUID} site={site} />
              })}

              {this.props.sitesFiltered.map((site, i) => {
                return (
                  <LazyLoad key={i} height={290} offset={600} once>
                    <WebsiteCard key={site.ZUID} site={site} />
                  </LazyLoad>
                )
              })}

              <Route path="/instances/:siteZUID" component={PropertyOverview} />
            </React.Fragment>
          ) : (
            // No sites so create a new one
            <WebsiteCreate />
          )}
        </main>
      </section>
    )
  }
}
export default connect(state => {
  const sites = Object.keys(state.sitesFiltered).reduce((acc, ZUID) => {
    acc.push(state.sitesFiltered[ZUID])
    return acc
  }, [])

  return {
    sites,
    sitesFiltered: sites.filter(site => !site.inviteZUID),
    sitesInvited: sites.filter(site => site.inviteZUID)
  }
})(Properties)
