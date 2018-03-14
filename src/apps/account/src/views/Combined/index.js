import React, { Component } from 'react';
import { connect } from 'react-redux';

import Profile from '../Profile';
import Email from '../Email';

class Combined extends Component {
  render() {
    return (
      <div>
        <Profile />
        <br /><hr /><br />
        <Email />
      </div>
    )
  }
}

export default connect(state => state)(Combined)
