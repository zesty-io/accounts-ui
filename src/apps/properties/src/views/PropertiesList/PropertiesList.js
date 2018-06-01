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

        {this.props.sitesFavorite.length ? (
          <React.Fragment>
            <h2 className={styles.SectionTitle}>Favorite Instances</h2>
            <main className={cx(styles.siteList, styles.Favorites)}>
              {this.props.sitesFavorite.map(site => {
                return (
                  <WebsiteCard
                    key={`${site.ZUID}-fave`}
                    site={site}
                    dispatch={this.props.dispatch}
                    favorite={true}
                  />
                )
              })}
            </main>
          </React.Fragment>
        ) : null}

        {this.props.sites.length ? (
          <React.Fragment>
            <h2 className={styles.SectionTitle}>All Instances</h2>
            <main className={styles.siteList} id="siteListWrapper">
              {this.props.sitesInvited.map(site => {
                return <WebsiteInvite key={site.ZUID} site={site} />
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
            </main>
          </React.Fragment>
        ) : (
          // No sites so create a new one
          <main className={styles.siteList}>
            <WebsiteCreate />
          </main>
        )}
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
