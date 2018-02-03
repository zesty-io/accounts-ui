import React, { Component } from 'react'
import {connect} from 'react-redux'
import styles from './WebsiteCreate.less'

class WebsiteCreate extends Component {
  render () {
    return (
      <section className={styles.WebsiteCreate}>
        <h2>WebsiteCreate</h2>
      </section>
    )
  }
}

export default connect(state => state)(WebsiteCreate)
