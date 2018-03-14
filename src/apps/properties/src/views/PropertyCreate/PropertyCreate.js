import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './PropertyCreate.less'

class PropertyCreate extends Component {
  render() {
    return (
      <section className={styles.PropertyCreate}>
        <h2>WebsiteCreate</h2>
      </section>
    )
  }
}

export default connect(state => state)(PropertyCreate)
