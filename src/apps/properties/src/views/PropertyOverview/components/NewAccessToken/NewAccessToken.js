import React, { Component } from 'react'
import { Input } from '@zesty-io/core/Input'
import { Button } from '@zesty-io/core/Button'
import { DropDownFieldType } from '@zesty-io/core/DropDownFieldType'

import { notify } from '../../../../../../../shell/store/notifications'
import { createAccessToken } from '../../../../store/sitesAccessTokens'

import styles from './NewAccessToken.less'

export default class Domain extends Component {
  constructor(props) {
    super(props)
    this.state = {
      submitted: false,
      token: null,
      selectedRole: 'Admin',
      errors: {
        name: false,
        role: false
      }
    }
    this.roles = this.props.siteRoles.map(role => ({
      value: role.name,
      text: role.name
    }))
  }

  selectRole = (name, value) => {
    this.setState({
      selectedRole: value,
      errors: { ...this.state.errors, role: value == 0 }
    })
  }

  handleSave = () => {
    this.setState({ submitted: true })
    if (!this.state.errors.name && !this.state.errors.role) {
      const role = this.props.siteRoles.find(
        role => this.state.selectedRole === role.name
      )
      this.props
        .dispatch(
          createAccessToken(this.props.siteZUID, this.state.token, role.ZUID)
        )
        .then(({ error, token }) => {
          this.setState({
            token: null,
            submitted: false
          })
          this.props.setNewToken(token)
          this.props.dispatch(
            notify({
              message: `Your token has been created`,
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
    } else {
      this.setState({ ...this.state, errors: { name: true, role: true } })
      this.setState({ submitted: false })
    }
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
                ...this.state,
                errors: {
                  ...this.state.errors,
                  name: !event.target.value
                }
              })
              this.setState({
                token: evt.target.value
              })
            }}
          />
          {this.state.errors.name && (
            <span className={styles.Error}>Name is required</span>
          )}
        </div>
        {this.props.siteRoles && this.props.siteRoles.length > 0 && (
          <div className={styles.Dropdown}>
            <DropDownFieldType
              name="role"
              value={this.state.selectedRole}
              onChange={(name, value) => this.selectRole(name, value)}
              selection={this.roles.filter(
                role => role.value === this.state.selectedRole
              )}
              options={this.roles}
            />
            {this.state.errors.role && (
              <span className={styles.Error}>Select a role</span>
            )}
          </div>
        )}
        <Button
          className={styles.Button}
          data-test="saveAccessToken"
          onClick={this.handleSave}
          disabled={!this.state.token && !this.state.role}>
          <i className="fa fa-plus" aria-hidden="true" />
          Create Token
        </Button>
      </label>
    )
  }
}
