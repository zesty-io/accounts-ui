import React, { Component } from 'react'
import {connect} from 'react-redux'
import cx from 'classnames'

import DetailsMenu from './DetailsMenu'
import Access from './Access'
import Overview from './Overview'
import Domain from './Domain'
import Stats from './Stats'
import Blueprint from './Blueprint'

import styles from './styles.less'

class Website extends Component {
  render () {
    return (
      <article className={styles.website}>
        <header>
          <h4>
            Web Property Overview
          </h4>
          <h3 className={styles.name}>
            {this.props.site.name}
          </h3>
        </header>
        <Overview site={this.props.site} />
        <Access site={this.props.site} />
        <Domain site={this.props.site} />
        <Stats site={this.props.site} />
        <Blueprint site={this.props.site} />
        <footer />
        <DetailsMenu />
      </article>
    )
  }
}

export default connect(state => state)(Website)
