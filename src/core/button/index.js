import React from 'react'
import styles from './styles.less'
import cx from 'classnames'

export default function Button (props) {
  let opts = {
    'className': cx(styles.button, props.className),
    'data-data': props.data,
    'onClick': props.onClick
  }
  if (props.disabled) {
    opts['disabled'] = 'disabled'
  }
  return (
    <button {...opts}>
      {props.text}
      {React.Children.map(props.children, (child, i) => {
        // If the first child is an element
        // assume it's an icon
        if (child.props && i === 0) {
          return (React.cloneElement(child, {
            className: cx(styles.icon, child.props.className)
          }))
        } else {
          // probably just a text node
          return child
        }
      })}
    </button>
  )
}
