import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import styles from './PropertiesList.less'

import PropertiesHeader from '../../components/PropertiesHeader'
import WebsiteOverview from '../../components/WebsiteOverview'
import WebsiteCard from '../../components/WebsiteCard'

import { getSites } from '../../store'

class Properties extends Component {
  componentDidMount() {
    this.props.dispatch(getSites(this.props.user.zuid))
  }
  render() {
    return (
      <section className={styles.Websites}>
        <PropertiesHeader />
        <main className={styles.siteList}>
          {Object.keys(this.props.filteredSites).map(zuid => {
            return (
              <WebsiteCard key={zuid} site={this.props.filteredSites[zuid]} />
            )
          })}
        </main>
        <Route path="/properties/:hash" component={WebsiteOverview} />
      </section>
    )
  }
}
export default connect(state => state)(Properties)
