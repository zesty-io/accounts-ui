import React, { Component } from 'react'

import { updateDomain } from '../../../../store/sites'
import { notify } from '../../../../../../../shell/store/notifications'

import styles from './Domain.less'

export default class Domain extends Component {
  /* TODO:
   **  users need to confirm and upgrade their
   **  accounts in order to use the custom
   **  domain feature. this will be implemented
   **  in a future API version
   */
  constructor(props) {
    super(props)
    this.state = {
      submitted: false,
      editing: false,
      domain: props.domain || ''
    }
  }
  render() {
    return (
      <label className={styles.Domain}>
        {this.state.submitted ? (
          <span>Saving&hellip;</span>
        ) : this.props.domain && !this.state.editing ? (
          <span
            className={styles.Name}
            onClick={() => {
              this.setState({
                editing: true
              })
            }}>
            {this.props.domain}
            <i className="fa fa-pencil" />
          </span>
        ) : (
          <span className={styles.Edit}>
            <Input
              value={this.state.domain}
              id="editDomainInput"
              placeholder="example.com"
              onChange={evt => {
                this.setState({
                  domain: evt.target.value
                })
              }}
            />
            <Button onClick={this.handleSave} id="editDomainSave">
              <i className="fa fa-save" aria-hidden="true" />
              Save
            </Button>
          </span>
        )}
      </label>
    )
  }

  handleSave = () => {
    this.setState({ submitted: true })

    let strippedDomain = ''
    if (this.state.domain) {
      strippedDomain = this.state.domain
        .toLowerCase()
        .replace(/http:\/\/|https:\/\//g, '')
    }

    this.props
      .dispatch(updateDomain(this.props.siteZUID, strippedDomain))
      .then(({ error, domain }) => {
        this.setState({
          domain,
          submitted: false,
          editing: false
        })
        this.props.dispatch(
          notify({
            message: `Your domain has been set to ${strippedDomain}`,
            type: 'success'
          })
        )
      })
      .catch(data => {
        this.setState({ submitted: false })
        this.props.dispatch(
          notify({
            message: data.error,
            type: 'error'
          })
        )
      })
  }
}
