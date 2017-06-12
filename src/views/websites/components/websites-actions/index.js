import React, { Component } from 'react'
import {connect} from 'react-redux'
import styles from './styles.less'

class WebsitesActions extends Component {
  render() {
    return (
      <header className={styles.WebsitesActions}>
        <h2>
          <i className="fa fa-globe" aria-hidden="true"></i>Your Web Properties
        </h2>
        <div className={styles.actions}>
          <Search className={styles.filter} placeholder="Search by web property name or domain" />
          <Button className="save">
            <i className="fa fa-plus" aria-hidden="true"></i>Add New Web Property
          </Button>
        </div>
      </header>
    )
  }
}

export default connect(state => state)(WebsitesActions)
