import React, { Component } from 'react'
import {connect} from 'react-redux'
import styles from './styles.less'

import WebsitesActions from './components/websites-actions'
import WebsiteView from './components/website-view'

import {getSites} from '../../store/sites'

class Websites extends Component {
  constructor(props) {
    super(props)
    console.log('Websites', this)
  }
  componentWillMount() {
    this.props.dispatch(getSites())
  }
  render() {
    return (
      <section className={styles.Websites}>
        <WebsitesActions />
        <main className={styles.siteList}>
          {Object.keys(this.props.sites).map(zuid => {
            return <WebsiteView key={zuid} site={this.props.sites[zuid]} />
          })}
        </main>
      </section>
    )
  }
}

export default connect(state => state)(Websites)
