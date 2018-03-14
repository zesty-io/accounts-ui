import React, { Component } from 'react'
import {connect} from 'react-redux'

import styles from './ResetPassword.less'
import {request} from '../../../util/request'

export default class ResetPassword extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <section className={styles.ResetPassword}>
        <form name='ResetPassword' className={styles.ResetPasswordForm}>
          <h2>Zesty.io ResetPassword</h2>
        </form>
      </section>
    )
  }
}
