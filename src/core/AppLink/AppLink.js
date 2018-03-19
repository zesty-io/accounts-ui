import React from 'react'
import { Link } from 'react-router-dom'
import styles from './AppLink.less'
import cx from 'classnames'

export default function AppLink(props) {
  return (
    <Link {...props} className={cx(styles.AppLink, props.className)}>
      {props.text}
      {props.children}
    </Link>
  )
}
