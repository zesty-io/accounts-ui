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
  if(!props.name){
    console.error("Input component requires a 'name' attribute")
    return <b>**INPUT COMPONENT REQUIRES A NAME ATTRIBUTE**</b>
  }else{
    return (
      <input {...props} className={cx(styles.Input, props.className)} />
    )
  }
}
