import React, { Component } from 'react'
import { connect } from 'react-redux'

import styles from './Modal.less'

export default props => {
  return props.isOpen && (
    <section className={styles.Modal}>{props.component}</section>
  )
}
