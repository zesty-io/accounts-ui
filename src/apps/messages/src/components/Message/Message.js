import React, { Component } from 'react'
import styles from './Message.less'

export default class Message extends Component {
  render () {
    return (
      <article className={styles.message}>
        <div className={styles.type}>
          Invite
        </div>
        <div className={styles.from}>
          Brian Cama
        </div>
        <div className={styles.note}>
          <p>You have been invited to join "Sony Alpha 2.0"</p>
        </div>
        <div className={styles.action}>
          <Button>Accept</Button>
        </div>
        <div className={styles.date}>
          Jan 6th, 2018
        </div>
      </article>
    )
  }
}
