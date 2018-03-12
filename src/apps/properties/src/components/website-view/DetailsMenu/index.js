import React, {Component} from 'react';
import {connect} from 'react-redux';

class DetailsMenu extends Component {
  render() {
    return (
      <div>menu items</div>
    )
  }
}

export default connect(state => state)(DetailsMenu)