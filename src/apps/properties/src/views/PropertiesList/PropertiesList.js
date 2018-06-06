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
  const filtered = Object.keys(state.sitesFiltered).reduce((acc, ZUID) => {
    if (!favorites.includes(ZUID)) {
      acc.push(state.sitesFiltered[ZUID])
    }
    return acc
  }, [])

  const layout = state.user.prefs.instance_layout || 'grid'

  return {
    layout,
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
