import React, { Component } from 'react'
import { connect } from 'react-redux'

class Domain extends Component {

  onChange = e => {
    this.props.dispatch({
      type: 'CHANGE_DOMAIN',
      type: e.target.type,
      zuid: this.props.site.zuid
    })
  }

  render() {
    return (
      <div>
        <form>
          <Input
            type='radio'
            name='domain'
            id='custom'
            onChange={this.onChange}
            // checked={this.props.site.domainSelect === 'custom' ? 'checked' : ''}
          />Custom Domain
            <Input
            type='radio'
            name='domain'
            id='vanity'
            // checked={this.props.site.domainSelect === 'vanity' ? 'checked' : ''}
            onChange={this.onChange}
          />Vanity Domain
            <Input
            type='radio'
            name='domain'
            id='no'
            onChange={this.onChange}
            // checked={this.props.site.domainSelect === 'no' ? 'checked' : ''}
          />No Domain
          </form>
      </div>
    )
  }
}

export default connect(state => state)(Domain)