import React, { Component } from 'react';
import { connect } from 'react-redux';

class AddAuth extends Component {
  handleChange = e => {
    console.log(e.target.name, e.target.value)
  }
  render() {
    return (
      <div>
        <Input type="text" size='5' placeholder='+1' name="phoneNumberPrefix" onChange={this.handleChange} />
        <Input type="text" placeholder='123 456 7890' name="phoneNumber" onChange={this.handleChange} />
      </div>
  )
  }
}

export default connect(state => state)(AddAuth)