import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import styles from './Message.less'

export default class Message extends Component {
  render () {
    console.log(this.props);
    return (
      <article className={styles.message}>
        <div className={styles.action}>
          {this.props.type == 'invite'
          ? <Button>Accept</Button>
          : null}
        </div>
        <div className={styles.type}>
          {this.props.type}
        </div>
        <div className={styles.from}>
          {this.props.from}
        </div>
        <div className={styles.note}>
          {/* <p>You have been invited to join <Link to="/properties/xxxxx0">"Sony Alpha 2.0"</Link></p> */}
          {this.props.message}
        </div>
        <div className={styles.date}>
          {this.props.date}
        </div>
      </article>
    )
  }
}
