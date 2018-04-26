import React, { Component } from 'react'
import { connect } from 'react-redux'

import { updateDomain } from '../../../store/sitesDomain'
import { fetchSite } from '../../../store/sites'
import { notify } from '../../../../../../shell/store/notifications'
import { zConfirm } from '../../../../../../shell/store/confirm'

import styles from './Domain.less'

class Domain extends Component {
  /* TODO: 
  **  users need to confirm and upgrade their
  **  accounts in order to use the custom
  **  domain feature. this will be implemented
  **  in a future API version
  */

  constructor(props) {
    super()
    this.state = {
      editName: false,
      domainSelect: '',
      name: ''
    }
  }

  componentDidMount() {
    let { domain } = this.props.site
    if (domain && domain.includes('.zesty.sites')) {
      this.setState({
        domainSelect: 'vanity',
        name: domain.substr(0, domain.indexOf('.'))
      })
    } else if (domain !== null && domain !== '') {
      this.setState({ domainSelect: 'custom', name: domain })
    }
  }

  onEditClick = () => {
    this.setState({ editName: !this.state.editName })
  }

  onChange = evt => {
    this.setState({
      domainSelect: evt.target.id,
      editName: !this.state.editName
    })
  }

  onSelect = evt => {
    evt.preventDefault()
  }

  onUpdate = () => {
    this.setState({ editName: !this.state.editName })
    if (this.state.domainSelect === 'vanity') {
      return this.setState({ name: `${this.state.name}.zesty.sites` }, () => {
        this.props
          .dispatch(updateDomain(this.props.siteZUID, this.state.name))
          .then(data => {
            this.props.dispatch(
              notify({
                message: `Your domain has been changed to ${data.data.domain}`,
                type: 'success'
              })
            )
            this.props.dispatch(fetchSite(this.props.siteZUID))
          })
          .catch(data => {
            this.props.dispatch(
              notify({
                message: `There was a problem changing your domain`,
                type: 'error'
              })
            )
          })
      })
    }
    this.props
      .dispatch(updateDomain(this.props.siteZUID, this.state.name))
      .then(data => {
        this.props.dispatch(
          notify({
            message: `Your domain has been changed to ${data.data.domain}`,
            type: 'success'
          })
        )
        this.props.dispatch(fetchSite(this.props.siteZUID))
      })
      .catch(data => {
        this.props.dispatch(
          notify({
            message: `There was a problem changing your domain`,
            type: 'error'
          })
        )
      })
  }

  handleRemove = () => {
    this.props.dispatch(
      zConfirm({
        prompt: `Are you sure you want to remove the ${
          this.state.domainSelect
        } domain?`,
        callback: response => {
          if (response) {
            return this.props
              .dispatch(updateDomain(this.props.siteZUID, null))
              .then(data => {
                this.props.dispatch(
                  notify({
                    message: `Your domain has been removed`,
                    type: 'success'
                  })
                )
                this.props.dispatch(fetchSite(this.props.siteZUID))
              })
              .catch(data => {
                this.props.dispatch(
                  notify({
                    message: `There was a problem changing your domain`,
                    type: 'error'
                  })
                )
              })
          }
        }
      })
    )
  }

  handleName = evt => {
    this.setState({ [evt.target.name]: evt.target.value })
  }

  render() {
    return (
      <article className={styles.Domain}>
        <span className={styles.siteName}>
          {this.props.site.domain && (
            <React.Fragment>
              <tt>{this.props.site.domain}</tt>
              <i
                className={
                  this.state.editName ? `${styles.invisible}` : 'fa fa-pencil'
                }
                aria-hidden="true"
                onClick={this.onEditClick}
              />
              <i
                className={
                  this.state.editName ? `${styles.invisible}` : 'fa fa-times'
                }
                aria-hidden="true"
                onClick={this.handleRemove}
              />
            </React.Fragment>
          )}
        </span>
        {this.state.editName ? (
          <span className={styles.nameInput}>
            {this.state.domainSelect === 'vanity' ? (
              <React.Fragment>
                <Input
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleName}
                />
                <tt>.zesty.sites</tt>
              </React.Fragment>
            ) : (
              <Input
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleName}
              />
            )}
            <i
              className="fa fa-save"
              aria-hidden="true"
              onClick={this.onUpdate}
            />
            <i
              className="fa fa-times-circle"
              aria-hidden="true"
              onClick={this.onEditClick}
            />
          </span>
        ) : null}
        <span className={styles.radioSelect}>
          <label>Custom Domain</label>
          <Input
            type="radio"
            name="domain"
            id="custom"
            onChange={this.onChange}
            checked={this.state.domainSelect === 'custom'}
          />
          <label>Zesty.io Vanity URL</label>
          <Input
            type="radio"
            name="domain"
            id="vanity"
            checked={this.state.domainSelect === 'vanity'}
            onChange={this.onChange}
          />
        </span>
      </article>
    )
  }
}

export default connect(state => state)(Domain)
