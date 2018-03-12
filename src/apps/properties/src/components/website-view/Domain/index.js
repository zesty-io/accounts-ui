import React, {Component} from 'react'
import {connect} from 'react-redux'

class Domain extends Component {
  
  onChange = e => {
    return null
  }

  render() {
    
    return (
      <div>
        <h3>Domain</h3>
          <form>
            <Input 
              type='radio'
              name='domain'
              id='custom'
              onChange={this.onChange}
              checked={this.props.site.domainSelect === 'custom' ? 'checked' : ''} 
              />Custom Domain
            <Input
              type='radio'
              name='domain'
              id='vanity'
              checked={this.props.site.domainSelect === 'vanity' ? 'checked' : ''}
              onChange={this.onChange}
              />Vanity Domain
            <Input
              type='radio'
              name='domain'
              id='no'
              onChange={this.onChange}
              checked={this.props.site.domainSelect === 'no' ? 'checked' : ''}
              />No Domain
          </form>
      </div>
    )
  }
}

export default connect(state => state)(Domain)