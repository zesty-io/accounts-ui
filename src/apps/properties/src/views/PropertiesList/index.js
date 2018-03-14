import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import styles from './PropertiesList.less'

<<<<<<< HEAD
import WebsitesActions from '../../components/websites-actions'
import WebsiteOverview from '../../components/WebsiteOverview'
=======
import PropertiesHeader from '../../components/PropertiesHeader'
import WebsiteView from '../../components/website-view'
>>>>>>> cbad923caac58be16f8ce3607b8c6255c5633bc1
import WebsiteCard from '../../components/WebsiteCard'

import { getSites } from '../../store'

class Properties extends Component {
  componentDidMount() {
    console.log(this.props.match)
    this.props.dispatch(getSites())
  }
  render() {
    return (
      <section className={styles.Websites}>
        <PropertiesHeader />
        <main className={styles.siteList}>
          {Object.keys(this.props.sites).map(zuid => {
            return <WebsiteCard key={zuid} site={this.props.sites[zuid]} />
          })}
        </main>
        <Route path="/properties/:hash" component={WebsiteOverview} />
      </section>
    )
  }
}
export default connect(state => state)(Properties)
