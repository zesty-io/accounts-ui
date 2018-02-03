import React from 'react'
import styles from './styles.less'
import cx from 'classnames'

export default function Link (props) {
  let opts = {
    'className': cx(styles.link, props.className),
    'target': props.target ? props.target : '_self',
    'href': props.href ? props.href : 'javascript:void(0)',
    'onClick': props.onClick,
    'data-data': props.data
  }
  return (
    <a {...opts}>
      {props.text}
      {props.children}
    </a>
  )
}
