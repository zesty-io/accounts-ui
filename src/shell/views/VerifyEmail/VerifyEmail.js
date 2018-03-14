import React, { Component } from 'react'
import {connect} from 'react-redux'

import styles from './VerifyEmail.less'
import {request} from '../../../util/request'

export default class VerifyEmail extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <section className={styles.VerifyEmail}>
        <form name='VerifyEmail' className={styles.VerifyEmailForm}>
          <h2>Zesty.io VerifyEmail</h2>
        </form>
      </section>
    )
  }
}
