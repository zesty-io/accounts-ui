import React, { PureComponent } from 'react'
import {Link} from 'react-router-dom'
import styles from './styles.less'

export default class MessageIcon extends PureComponent {
  render () {
    return (
      <span className={styles.MessageIcon}>
        <i className='fa fa-comments' aria-hidden='true' />
      </span>
    )
  }
}
