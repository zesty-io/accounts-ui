import React from 'react'
import styles from './Input.less'
import cx from 'classnames'

export default function Input(props) {
  // let opts = {
  //   'className': cx(styles.button, props.className),
  //   'data-data': props.data,
  //   'onClick': props.onClick
  // }
  // if (props.disabled) {
  //   opts['disabled'] = 'disabled'
  // }
  return (
    <input {...props} className={cx(styles.Input, props.className)} />
  )
}
