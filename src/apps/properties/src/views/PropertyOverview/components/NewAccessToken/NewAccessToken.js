import React, { Component } from 'react'
import { Input } from '@zesty-io/core/Input'
import { Button } from '@zesty-io/core/Button'
import { DropDownFieldType } from '@zesty-io/core/DropDownFieldType'

import { notify } from '../../../../../../../shell/store/notifications'
import { createAccessToken } from '../../../../store/sitesAccessTokens'

import styles from './NewAccessToken.less'

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
      token: null,
      selectedRole: 'Admin'
    }
    this.roles = this.props.siteRoles.map(role => ({
      value: role.name,
      text: role.name
    }))
  }

  selectRole = value => {
    this.setState({ siteRole: value })
  }

  handleSave = () => {
    this.setState({ submitted: true })
    const role = this.props.siteRoles.find(
      role => this.state.selectedRole === role.name
    )
    console.log('role', role)
    this.props
      .dispatch(
        createAccessToken(this.props.siteZUID, this.state.token, role.ZUID)
      )
      .then(({ error, domain }) => {
        this.setState({
          domain: null,
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
            name="token"
            placeholder="Enter token name"
            value={this.state.token}
            onChange={evt => {
              this.setState({
                token: evt.target.value
              })
            }}
          />
        </div>
        {this.props.siteRoles && this.props.siteRoles.length > 0 && (
          <DropDownFieldType
            name="branch"
            onChange={this.selectBranch}
            selection={this.roles.filter(
              role => role.value === this.state.selectedRole
            )}
            options={this.roles}
          />
        )}
        <Button
          className={styles.Button}
          data-test="saveAccessToken"
          disabled={
            !this.state.token ||
            !this.state.selectedRole ||
            this.state.submitted
          }
          onClick={this.handleSave}>
          <i className="fa fa-plus" aria-hidden="true" />
          Save Token
        </Button>
      </label>
    )
  }
}
