import React, { Component } from 'react'
import {connect} from 'react-redux'

class Websites extends Component {
  render() {
    return (
      <section id="websites">
        <h2>Websites</h2>
      </section>
    )
  }
}

export default connect(state => state)(Websites)
