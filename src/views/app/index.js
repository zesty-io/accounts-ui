import React, { Component } from 'react'
import {connect} from 'react-redux'

class App extends Component {
  render() {
    return (
      <section id="app">
        <h1>Accounts App</h1>
      </section>
    )
  }
}

const AppView = connect(state => state)(App)

export default AppView
