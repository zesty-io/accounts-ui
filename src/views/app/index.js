import React, { Component } from 'react'
import {connect} from 'react-redux'
import styles from './styles.css'
import GlobalHeader from '../../components/GlobalHeader'

class App extends Component {
  render() {
    return (
      <section className={styles.app}>
        <GlobalHeader />
        <h1>Accounts App</h1>
        {this.props.children}
      </section>
    )
  }
}

const AppView = connect(state => state)(App)

export default AppView
