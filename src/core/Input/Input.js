import React from 'react'
import styles from './Input.less'
import cx from 'classnames'

export default function Input(props) {
  if (props.disabled) {
    props['disabled'] = 'disabled'
  }
  return <input {...props} className={cx(styles.Input, props.className)} />
}
