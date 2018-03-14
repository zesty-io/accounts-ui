import React, { Component } from 'react'
import {connect} from 'react-redux'
import styles from './styles.less'

import Message from '../../components/Message'
import {fetchMessages} from '../../store'

class Messages extends Component {
  componentWillMount() {
    this.props.dispatch(fetchMessages())
  }
  render () {
    console.log(Object.keys(this.props.messages));
    return (
      <section id='dashboard'>
        <main className={styles.messages}>
          <h2>Messages</h2>
          <header>
            <div className={styles.action}>Action</div>
            <div className={styles.type}>Type</div>
            <div className={styles.from}>From</div>
            <div className={styles.note}>Message</div>
            <div className={styles.date}>Date</div>
          </header>
          {Object.keys(this.props.messages).map(id => {
            return <Message key={id} {...this.props.messages[id]} />
          })}
        </main>
      </section>
    )
  }
}

export default connect(state => {
  // console.log(state);
  // return state
  return {
    messages: state.messages
  }
})(Messages)
