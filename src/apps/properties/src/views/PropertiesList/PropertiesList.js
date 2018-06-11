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
  let favorites = state.user.prefs.favorite_sites.filter(ZUID =>
    Object.keys(state.sites).includes(ZUID)
  )

  const layout = state.user.prefs.instance_layout || 'grid'

  const searchString =
    state.settings.filter && state.settings.filter.toLowerCase()
  const eco = state.settings.eco

  const sites = state.sites

  let filtered = {}
  let ecosystem = {}

  if (eco) {
    for (const zuid in sites) {
      let site = sites[zuid]
      if (site.ecoID && site.ecoID == eco) {
        ecosystem[zuid] = site
      }
    }
    if (!searchString) {
      filtered = ecosystem
    }
  }
  if (searchString) {
    let instances = eco ? ecosystem : sites
    for (const zuid in instances) {
      const site = instances[zuid]
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
  }
  if (!eco && !searchString) {
    filtered = sites
  }

  let removedFavorites
  if (eco || searchString) {
    removedFavorites = Object.keys(filtered).reduce((acc, ZUID) => {
      acc.push(filtered[ZUID])
      return acc
    }, [])
    favorites = []
  } else {
    removedFavorites = Object.keys(filtered).reduce((acc, ZUID) => {
      if (!favorites.includes(ZUID)) {
        acc.push(filtered[ZUID])
      }
      return acc
    }, [])
  }

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
