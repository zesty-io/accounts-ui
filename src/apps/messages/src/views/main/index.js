import React, { Component } from 'react'
import {connect} from 'react-redux'
import styles from './styles.less'

import Message from '../../components/Message'

class Messages extends Component {
  render () {
    return (
      <section id='dashboard'>
        <main className={styles.messages}>
          <h2>Messages</h2>
          <header>
            <div className={styles.type}>Type</div>
            <div className={styles.from}>From</div>
            <div className={styles.note}>Message</div>
            <div className={styles.action}>Action</div>
            <div className={styles.date}>Date</div>
          </header>
          {[0,1,2,3,4].map(message => <Message message={message} />)}
        </main>
      </section>
    )
  }
}

export default connect(state => state)(Messages)
