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
          {this.props.sites.length ? (
            <div className={styles.siteList} id="siteListWrapper">
              {this.props.sitesInvited.map(site => {
                return <WebsiteInvite key={site.ZUID} site={site} />
              })}

              {this.props.sitesFavorite.map(site => {
                return (
                  <WebsiteCard
                    key={`${site.ZUID}-fave`}
                    site={site}
                    dispatch={this.props.dispatch}
                    starred={true}
                  />
                )
              })}

              {this.props.sitesFiltered.map(site => {
                return (
                  <WebsiteCard
                    key={site.ZUID}
                    site={site}
                    dispatch={this.props.dispatch}
                  />
                )
              })}
              <Route path="/instances/:siteZUID" component={PropertyOverview} />
            </div>
          ) : (
            // No sites so create a new one
            <div className={styles.siteList}>
              <WebsiteCreate />
            </div>
          )}
        </main>
      </section>
    )
  }
}
export default connect((state, props) => {
  const favorites = state.user.prefs.favorite_sites
  const sites = Object.keys(state.sitesFiltered).reduce((acc, ZUID) => {
    if (!favorites.includes(ZUID)) {
      acc.push(state.sitesFiltered[ZUID])
    }
    return acc
  }, [])

  return {
    sites,
    sitesFiltered: sites.filter(site => !site.inviteZUID),
    sitesInvited: sites.filter(site => site.inviteZUID),
    sitesFavorite: favorites.map(ZUID => state.sites[ZUID]),
    dispatch: props.dispatch
  }
})(Properties)
