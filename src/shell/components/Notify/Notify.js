import React, { Component } from 'react'
import { connect } from 'react-redux'

import Notification from './Notification'

import styles from './Notify.less'

class Notify extends Component {
  render() {
    return (
      <section className={styles.Notify}>
        {this.props.notifications.map(notification => {
          return (
            <Notification
              {...notification}
              key={notification.epoch}
              dispatch={this.props.dispatch}
            />
          )
        })}
      </section>
    )
  }
}

export default connect(state => {
  return { notifications: state.notifications }
})(Notify)
