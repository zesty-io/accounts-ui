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
      selectedRole: null,
      errors: {
        name: true,
        role: true
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

  validateFields = () => {
    if (this.state.errors.name) {
      this.props.dispatch(
        notify({
          message: `Please specify the name of the token`,
          type: 'error'
        })
      )
    }
    if (this.state.errors.role) {
      this.props.dispatch(
        notify({
          message: `Please select the role`,
          type: 'error'
        })
      )
    }
  }

  handleSave = () => {
    this.setState({ submitted: true })
    this.validateFields()
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
            submitted: false,
            errors: {
              name: true
            }
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
    }
  }

  render() {
    return (
      <label className={styles.AccessToken}>
        <div className={styles.AccessTokenInput}>
          <Input
            name="token"
            placeholder="Enter token name"
            value={this.state.token}
            onChange={evt => {
              this.setState({
                token: evt.target.value,
                errors: {
                  ...this.state.errors,
                  name: !event.target.value
                }
              })
            }}
          />
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
          </div>
        )}
        <Button
          className={styles.Button}
          data-test="saveAccessToken"
          onClick={this.handleSave}>
          <i className="fa fa-plus" aria-hidden="true" />
          Create Token
        </Button>
      </label>
    )
  }
}
