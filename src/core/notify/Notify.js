import React from 'react'

import styles from './Notify.less'

export default function Notify(props) {
  console.log(props)
  return <p className={`styles.${props.style}`}>
  <i className="fa fa-exclamation-triangle" aria-hidden="true" />&nbsp;{
    props.message
  }
</p>
}
