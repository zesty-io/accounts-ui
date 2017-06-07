import React from 'react'
import styles from './styles.less'
import cx from 'classnames'

export default function Infotip(props) {
  return (
    <div className={styles.tip}>
      <i className={cx(styles.tipIcon, "fa fa-question-circle")} aria-hidden="true"></i>
      <p className={styles.tipText}>
        {props.children}{props.title}
      </p>
    </div>
  )
}
