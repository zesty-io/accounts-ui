import React, { Component } from 'react'
import cx from 'classnames'
import styles from './PropertyName.less'

import { notify } from '../../../../../../../shell/store/notifications'
import { updateSite, fetchSite } from '../../../../store/sites'

import { Input } from '@zesty-io/core/Input'
import { Button } from '@zesty-io/core/Button'

export default class PropertyName extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editName: false,
      name: this.props.name || ''
    }
  }
  render() {
    return (
      <label className={styles.PropertyName}>
        {this.state.editName ? (
          <div className={styles.EditName}>
            <Input
              value={this.state.name}
              name="instanceName"
              onChange={evt => {
                this.setState({
                  name: evt.target.value.trim()
                })
              }}
            />
            <Button onClick={this.handleNameUpdate} id="saveInstanceName">
              <i className="fa fa-save" />
              Save
            </Button>
            <Button kind="cancel" onClick={() => {}}>
              <i className="fa fa-ban" />
              &nbsp;
            </Button>
          </div>
        ) : (
          <span
            className={styles.Name}
            id="editInstanceName"
            title="Edit instance title name"
            onClick={this.editName}>
            {this.props.name}
            <i
              className={cx('fas fa-pencil-alt', styles.Edit)}
              aria-hidden="true"
            />
          </span>
        )}
      </label>
    )
  }
  editName = () => {
    this.setState({
      editName: !this.state.editName
    })
  }
  handleNameUpdate = () => {
    this.props
      .dispatch(
        updateSite(this.props.siteZUID, {
          name: this.state.name
        })
      )
      .then(res => {
        this.props.dispatch(fetchSite(this.props.siteZUID))
        this.props.dispatch(
          notify({
            message: 'Name Successfully Updated',
            type: 'success'
          })
        )
        return this.setState({
          editName: false
        })
      })
      .catch(err => {
        this.props.dispatch(
          notify({
            message: 'Error Updating Name',
            type: 'error'
          })
        )
        return this.setState({
          editName: false
        })
      })
  }
}
