import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import styles from './PropertiesList.less'

import WebsiteCreate from '../../components/WebsiteCreate'
import PropertiesHeader from './components/PropertiesHeader'
import ColumnList from './components/ColumnList'
import GridList from './components/GridList'

class Properties extends Component {
  render() {
    return (
      <section className={styles.Websites}>
        <PropertiesHeader layout={this.props.layout} />

        {this.props.layout === 'grid' ? (
          <GridList {...this.props} />
        ) : (
          <ColumnList {...this.props} />
        )}

        {!this.props.sites.length ? (
          <main className={styles.siteList}>
            <WebsiteCreate />
          </main>
        ) : null}
      </section>
    )
  }
}

export default connect((state, props) => {
  const favorites = state.user.prefs.favorite_sites.filter(ZUID =>
    Object.keys(state.sites).includes(ZUID)
  )

  const layout = state.user.prefs.instance_layout || 'grid'

  // filter based on state.settings.filter
  const searchString =
    state.settings.filter && state.settings.filter.toLowerCase()
  let sites = state.sites
  let filtered = {}

  if (searchString) {
    // check settings ecosystem not typeof searchString
    if (!state.settings.ecosystem) {
      for (const zuid in sites) {
        const site = sites[zuid]
        const name = site.name && site.name.toString().toLowerCase()
        if (name && name.includes(searchString)) {
          filtered[zuid] = site
        } else if (site.ZUID && site.ZUID.includes(searchString)) {
          filtered[zuid] = site
        } else if (site.domain && site.domain.includes(searchString)) {
          filtered[zuid] = site
        } else if (
          site.RandomHashID &&
          site.RandomHashID.includes(searchString)
        ) {
          filtered[zuid] = site
        }
      }
    } else {
      for (const zuid in sites) {
        let site = sites[zuid]
        if (site.ecoID && site.ecoID == searchString) {
          filtered[zuid] = site
        }
      }
    }
  } else {
    // if there is no searchString return sites
    filtered = state.sites
  }

  //remove favorites from all other instances
  const removedFavorites = Object.keys(filtered).reduce((acc, ZUID) => {
    if (!favorites.includes(ZUID)) {
      acc.push(filtered[ZUID])
    }
    return acc
  }, [])

  return {
    layout,
    sites: Object.keys(state.sites),
    sitesFiltered: removedFavorites.filter(site => !site.inviteZUID),
    sitesInvited: removedFavorites.filter(site => site.inviteZUID),
    sitesFavorite: favorites.filter(site => filtered[site]).map(ZUID => {
      return { ...filtered[ZUID], favorite: true }
    }),
    dispatch: props.dispatch,
    settings: state.settings
  }
})(Properties)
