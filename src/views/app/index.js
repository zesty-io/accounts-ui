import React, { Component } from 'react'
import {connect} from 'react-redux'
import styles from './styles.less'
import GlobalHeader from '../../components/GlobalHeader'

class App extends Component {
  constructor() {
    super()
    console.log('App', this)
  }
  render() {
    return (
      <section className={styles.app}>
        <GlobalHeader />
        {this.props.children}
      </section>
    )
  }
}

const AppView = connect(state => state)(App)

export default AppView
