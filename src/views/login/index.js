import React, { Component } from 'react'
import {connect} from 'react-redux'

export default class Login extends Component {
  render() {
    return (
      <section id="login">
        <h2>Login</h2>
        <form>
          <label>
            <input type="email" />
            <button>Login</button>
          </label>
        </form>
      </section>
    )
  }
}
