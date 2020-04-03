import React, { Component } from 'react'
import { connect } from 'react-redux'

import WebsiteCreate from '../../components/WebsiteCreate'
import PropertiesHeader from './components/PropertiesHeader'
import ColumnList from './components/ColumnList'
import GridList from './components/GridList'

import styles from './PropertiesList.less'
export default connect((state, props) => {
  let favorites = state.user.prefs.favorite_sites.filter(ZUID =>
    Object.keys(state.sites).includes(ZUID)
  )

  const layout = state.user.prefs.instance_layout || 'grid'

  // set the search string end ecosystem from the settings object
  const searchString =
    state.settings.filter && state.settings.filter.toLowerCase()

  const eco = state.settings.eco
  const sites = state.sites

  let filtered = {}
  let ecosystem = {}

  // filter by ecosystem if eco is present
  if (eco) {
    for (const zuid in sites) {
      let site = sites[zuid]
      if (site && site.ecoZUID === eco) {
        ecosystem[zuid] = site
      }
    }
    // we are done filtering if there is no searchString
    if (!searchString) {
      filtered = ecosystem
    }
  }

  // filter sites if searchString is present
  if (searchString) {
    let instances = eco ? ecosystem : sites
    for (const zuid in instances) {
      const site = instances[zuid]
      const name = site.name && site.name.toString().toLowerCase()
      if (name && name.includes(searchString)) {
        filtered[zuid] = site
      }
      if (site.ZUID && site.ZUID.includes(searchString)) {
        filtered[zuid] = site
      }
      if (site.domain && site.domain.includes(searchString)) {
        filtered[zuid] = site
      }
      if (String(site.ID) && String(site.ID).includes(searchString)) {
        filtered[zuid] = site
      }
      if (site.randomHashID && site.randomHashID.includes(searchString)) {
        filtered[zuid] = site
      }
    }
  }
  // return all sites if no filters are set
  if (!eco && !searchString) {
    filtered = sites
  }

  let removedFavorites
  if (eco || searchString) {
    removedFavorites = Object.keys(filtered).reduce((acc, ZUID) => {
      filtered[ZUID].favorite = state.user.prefs.favorite_sites.includes(ZUID)
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
    sitesFavorite: favorites
      .filter(site => filtered[site])
      .map(ZUID => {
        return { ...filtered[ZUID], favorite: true }
      }),
    dispatch: props.dispatch,
    settings: state.settings,
    searchString
  }
})(
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
)
