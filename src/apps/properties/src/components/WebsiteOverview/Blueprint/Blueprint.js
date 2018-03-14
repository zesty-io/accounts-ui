import React, {Component} from 'react'
import {connect} from 'react-redux'
import { NavLink } from 'react-router-dom'
 
class Blueprint extends Component {
  render() {
    return (
      <div>
        <img src={this.props.site.blueprintImgUrl}
          style={{maxHeight:'64px', maxWidth:'64px'}}
          alt='blueprint Image' />
        current blueprint: {this.props.site.blueprint}
        {this.props.site.blueprintDetails}
        <a href='github.url'>View on Github</a>
        <NavLink to='/account/blueprints'>Change Blueprint</NavLink>
      </div>
    )
  }
}

export default connect(state => state)(Blueprint)