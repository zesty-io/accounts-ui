import React, { Component } from 'react'
import { connect } from 'react-redux'

import { updateDomain } from '../../../store/sitesDomain'
import { notify } from '../../../../../../shell/store/notifications'

import styles from './Domain.less'

class Domain extends Component {
  constructor(props) {
    super()
    this.state = {
      inputName: false,
      name: ''
    }
  }
  onChange = evt => {
    evt.preventDefault()
    this.setState({ [evt.target.name]: evt.target.value })
  }
  onSelect = evt => {
    evt.preventDefault()

  }
  onUpdate = () => {
    this.props.dispatch(updateDomain(this.props.siteZUID, this.state.name))
  }

  render() {
    return (
      <React.Fragment>
        <div
          className={
            this.state.inputName ? styles.nameInput : styles.invisible
          }>
          <Input type="text" name="name" onChange={this.handleName} />
        </div>

        <div className={styles.Domain}>
          <label>Custom Domain</label>
          <Input
            type="radio"
            name="domain"
            id="custom"
            onChange={this.onChange}
            checked={this.props.site.domainSelect === 'custom' ? 'checked' : ''}
          />
          <label>Zesty.io Vanity URL</label>
          <Input
            type="radio"
            name="domain"
            id="vanity"
            checked={this.props.site.domainSelect === 'vanity' ? 'checked' : ''}
            onChange={this.onChange}
          />
        </div>
      </React.Fragment>
    )
  }
}

export default connect(state => state)(Domain)
