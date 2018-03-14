import React, {Component} from 'react'
import {connect} from 'react-redux'
import { NavLink } from 'react-router-dom'
 
class Blueprint extends Component {
  render() {
    return (
      <div>
        <h3>Blueprint</h3>        
        <p>current blueprint: {this.props.site.blueprint}</p>
        <img src={this.props.site.blueprintImgUrl} alt='blueprint Image' />
        <p>{this.props.site.blueprintDetails}</p>
        <a href='github.url'>View on Github</a>
        <NavLink to='/account/blueprints'>Change Blueprint</NavLink>
      </div>
    )
  }
}

export default connect(state => state)(Blueprint)