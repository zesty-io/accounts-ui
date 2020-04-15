import React, { Component } from 'react'

import { addDomain } from '../../../../store/sitesDomains'
import { notify } from '../../../../../../../shell/store/notifications'

import { Input } from '@zesty-io/core/Input'
import { Button } from '@zesty-io/core/Button'
import { DropDownFieldType } from '@zesty-io/core/DropDownFieldType'

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
      domain: null,
      domainBranch: 'dev'
    }
    this.branches = [
      { value: 'dev', text: 'dev' },
      { value: 'live', text: 'live' }
    ]
  }

  selectBranch = (name, value) => {
    this.setState({ domainBranch: value })
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
      .dispatch(
        addDomain(this.props.siteZUID, strippedDomain, this.state.domainBranch)
      )
      .then(({ error, domain }) => {
        this.setState({
          domain,
          submitted: false
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

  render() {
    return (
      <label className={styles.Domain}>
        <div className={styles.DomainInput}>
          <Input
            name="domain"
            placeholder="Set a custom domain"
            value={this.state.domain}
            onChange={evt => {
              this.setState({
                domain: evt.target.value
              })
            }}
          />
        </div>
        {this.props.customDomains && this.props.customDomains.length > 0 && (
          <DropDownFieldType
            name="branch"
            onChange={this.selectBranch}
            selection={this.branches.filter(
              branch => branch.value === this.state.domainBranch
            )}
            options={this.branches}
          />
        )}
        <Button
          className={styles.Button}
          data-test="saveDomain"
          disabled={
            this.props.domain === this.state.domain || this.state.submitted
          }
          onClick={this.handleSave}>
          <i className="fa fa-plus" aria-hidden="true" />
          Add domain
        </Button>
      </label>
    )
  }
}
