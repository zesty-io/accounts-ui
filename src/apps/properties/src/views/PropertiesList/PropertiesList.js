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
      <section className={styles.Websites} id="siteListWrapper">
        <PropertiesHeader />
        <Route path="/instances/:siteZUID" component={PropertyOverview} />

        {this.props.sitesInvited.length ? (
          <React.Fragment>
            <h2 className={styles.SectionTitle}>
              <i className="fa fa-envelope-o" aria-hidden="true" />
              &nbsp;Invites
            </h2>
            <main className={styles.siteList}>
              {this.props.sitesInvited.map(this.renderCard)}
            </main>
          </React.Fragment>
        ) : null}

        {!this.props.settings.filter && this.props.sitesFavorite.length ? (
          <React.Fragment>
            <h2 className={styles.SectionTitle}>
              <i className="fa fa-star-o" aria-hidden="true" />
              &nbsp;Favorites
            </h2>
            <main className={cx(styles.siteList, styles.Favorites)}>
              {this.props.sitesFavorite.map(this.renderCard)}
            </main>
          </React.Fragment>
        ) : null}

        {this.props.sitesFiltered.length ? (
          <React.Fragment>
            <h2 className={styles.SectionTitle}>
              <i className="fa fa-th" aria-hidden="true" />
              &nbsp;All Instances
            </h2>
            <main className={styles.siteList}>
              {this.props.sitesFiltered.map(this.renderCard)}
            </main>
          </React.Fragment>
        ) : (
          <main className={styles.siteList}>
            <h2>No results</h2>
          </main>
        )}

        {!this.props.sites.length ? (
          // No sites so create a new one
          <main className={styles.siteList}>
            <WebsiteCreate />
          </main>
        ) : null}
      </section>
    )
  }
  renderCard = site => {
    return (
      <WebsiteCard
        key={site.ZUID}
        site={site}
        dispatch={this.props.dispatch}
        favorite={site.favorite}
      />
    )
  }
}
export default connect((state, props) => {
  const favorites = state.user.prefs.favorite_sites
  const filtered = Object.keys(state.sitesFiltered).reduce((acc, ZUID) => {
    if (!favorites.includes(ZUID)) {
      acc.push(state.sitesFiltered[ZUID])
    }
    return acc
  }, [])

  return {
    sites: Object.keys(state.sites),
    sitesFiltered: filtered.filter(site => !site.inviteZUID),
    sitesInvited: filtered.filter(site => site.inviteZUID),
    sitesFavorite: favorites.map(ZUID => {
      return { ...state.sites[ZUID], favorite: true }
    }),
    dispatch: props.dispatch,
    settings: state.settings
  }
})(Properties)
