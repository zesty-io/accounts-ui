import React, {Component} from 'react'
import {connect} from 'react-redux'
import { NavLink } from 'react-router-dom'
 
class Blueprint extends Component {
  render() {
    const blueprint = this.props.blueprints[this.props.site.BlueprintID]
    return <p>hi</p>
      // {blueprint
      //   ? (<React.Fragment>
      //   <img src={blueprint.MainImage}
      //     style={{maxHeight:'64px', maxWidth:'64px'}}
      //     alt='blueprint Image' />
      //   current blueprint: {blueprint.Name}
      //   {blueprint.Description}
      //   <a href={blueprint.PreviewURL}>View Preview</a>
      //   <NavLink to='/account/blueprints'>Change Blueprint</NavLink>
      // </React.Fragment>)
      //   : 'loading'}
  }
}

export default connect(state => state)(Blueprint)