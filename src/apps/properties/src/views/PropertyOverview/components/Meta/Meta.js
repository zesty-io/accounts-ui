import React, { Component, useState } from 'react'
import { connect } from 'react-redux'
import Domain from '../Domain'
import { addDomain, removeDomain } from '../../../../store/sitesDomains'
import { notify } from '../../../../../../../shell/store/notifications'

import PropertyName from '../PropertyName'
import Table from '../../../../components/Table'
import { Card, CardHeader, CardContent, CardFooter } from '@zesty-io/core/Card'
import { Modal, ModalContent, ModalFooter } from '@zesty-io/core/Modal'
import { Input } from '@zesty-io/core/Input'
import { Url } from '@zesty-io/core/Url'
import { Button } from '@zesty-io/core/Button'
import { Infotip } from '@zesty-io/core/Infotip'
import { DropDownFieldType } from '@zesty-io/core/DropDownFieldType'

import styles from './Meta.less'

const formatDate = date => {
  if (!date) {
    return ''
  }
  const newDate = new Date(date)
  return `${newDate.getMonth() +
    1}-${newDate.getDate()}-${newDate.getFullYear()}`
}

export default class Meta extends Component {
  constructor(props) {
    super(props)
    this.state = {
      domain: null,
      openModal: false,
      submitted: false,
      openRemoveModal: false,
      domainToDelete: null,
      domainBranch: 'dev'
    }
  }

  setModalOpen = openModal => {
    this.setState({ openModal })
  }

  setRemoveModalOpen = openRemoveModal => {
    this.setState({ openRemoveModal })
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
        addDomain(this.props.site.ZUID, strippedDomain, this.state.domainBranch)
      )
      .then(() => {
        this.setState({
          submitted: false,
          openModal: false,
          domain: null
        })
        this.props.dispatch(
          notify({
            message: `Your domain has been added`,
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

  handleRemove = () => {
    if (this.state.domainToDelete) {
      this.props
        .dispatch(removeDomain(this.props.site.ZUID, this.state.domainToDelete))
        .then(({ error, domain }) => {
          this.props.dispatch(
            notify({
              message: `Your domain has been removed`,
              type: 'success'
            })
          )
          this.setState({ domainToDelete: null, openRemoveModal: false })
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

  handleConfirmDelete = domainZUID => {
    this.setState({ domainToDelete: domainZUID })
    this.setRemoveModalOpen(true)
  }

  renderDomainsActions = index => {
    const domainZUID = this.props.domains[index].ZUID
    return (
      <Button
        kind="warn"
        className={styles.delete}
        onClick={() => this.handleConfirmDelete(domainZUID)}>
        <i className="fas fa-trash" />
      </Button>
    )
  }

  selectBranch = (name, value) => {
    this.setState({ domainBranch: value })
  }

  render() {
    const domainsTable = this.props.domains.map(domainData => {
      const { domain, branch, createdAt } = domainData
      return {
        domain,
        branch,
        createdAt: formatDate(createdAt)
      }
    })

    const branches = [
      { value: 'dev', text: 'dev' },
      { value: 'live', text: 'live' }
    ]
    return (
      <>
        <Card className={styles.Meta}>
          <CardHeader className={styles.CardHeader}>
            <h2>
              <i className="fa fa-info-circle" aria-hidden="true" />
              &nbsp;
              <PropertyName
                siteZUID={this.props.site.ZUID}
                name={this.props.site.name}
                dispatch={this.props.dispatch}
              />
            </h2>
          </CardHeader>
          <CardContent className={styles.CardContent}>
            <div className={styles.TableAction}>
              <h3>Domains</h3>
              <Button onClick={() => this.setModalOpen(true)}>
                Add domain
              </Button>
            </div>
            {this.props.domains ? (
              <Table
                arrangement="3 1 1 1"
                data={domainsTable}
                siteZUID={this.props.site.ZUID}
                dispatch={this.props.dispatch}
                isAdmin={this.props.isAdmin}
                actions={this.renderDomainsActions}
              />
            ) : (
              <em>Ask your instance owner to set a domain</em>
            )}

            <article>
              <p className={styles.setting}>
                <span className={styles.title}>Created On:</span>{' '}
                <span className={styles.NonEditable}>
                  {formatDate(this.props.site.createdAt)}
                </span>
              </p>
              <p className={styles.setting}>
                <span className={styles.title}>Updated On:</span>{' '}
                <span className={styles.NonEditable}>
                  {formatDate(this.props.site.updatedAt)}
                </span>
              </p>
              <p className={styles.setting}>
                <span className={styles.title}>Instance ZUID:</span>{' '}
                <span className={styles.NonEditable}>
                  {this.props.site.ZUID}
                </span>
              </p>
              <p className={styles.setting}>
                <span className={styles.title}>
                  Numeric ID <small>(Legacy)</small>:
                </span>
                <span className={styles.NonEditable}>{this.props.site.ID}</span>
              </p>
              <p className={styles.setting}>
                <span className={styles.title}>
                  Hash ID <small>(Legacy)</small>:
                </span>
                <span className={styles.NonEditable}>
                  {this.props.site.randomHashID}
                </span>
              </p>
            </article>
            <Url
              className={styles.manager}
              target="_blank"
              href={`${CONFIG.MANAGER_URL_PROTOCOL}${this.props.site.randomHashID}${CONFIG.MANAGER_URL}/#!/settings/instance/general`}>
              <i className="fa fa-external-link" aria-hidden="true" />
              &nbsp;Open Instance Settings
            </Url>
          </CardContent>
        </Card>
        {this.state.openModal && (
          <Modal onClose={() => this.setModalOpen(false)}>
            <ModalContent className={styles.ModalContent}>
              <h2 className={styles.ModalTitle}>Add a new domain</h2>
              <div className={styles.Form}>
                <div className={styles.FieldGroup}>
                  <span className={styles.title}>Domain</span>{' '}
                  <Input
                    className={styles.Field}
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
                <div className={styles.FieldGroup}>
                  <span className={styles.title}>Branch</span>{' '}
                  <DropDownFieldType
                    name="branch"
                    onChange={this.selectBranch}
                    selection={branches.filter(
                      branch => branch.value === this.state.domainBranch
                    )}
                    options={branches}
                  />
                </div>
              </div>
            </ModalContent>
            <ModalFooter className={styles.ModalFooter}>
              <Button kind="cancel" onClick={() => this.setModalOpen(false)}>
                <i className="fas fa-ban"></i>Cancel (ESC)
              </Button>
              <Button
                data-test="saveDomain"
                kind="save"
                disabled={
                  this.props.domain === this.state.domain ||
                  this.state.submitted
                }
                onClick={this.handleSave}>
                <i className="fas fa-save" aria-hidden="true" />
                Save
              </Button>
            </ModalFooter>
          </Modal>
        )}
        {this.state.openRemoveModal && (
          <Modal onClose={() => this.setRemoveModalOpen(false)}>
            <ModalContent className={styles.ModalContent}>
              <h2>Are you sure you want to remove your domain?</h2>
            </ModalContent>
            <ModalFooter className={styles.ModalFooter}>
              <Button
                kind="cancel"
                onClick={() => this.setRemoveModalOpen(false)}>
                <i className="fas fa-ban"></i>Cancel (ESC)
              </Button>
              <Button
                data-test="saveDomain"
                kind="warn"
                onClick={this.handleRemove}>
                <i className="fas fa-trash" aria-hidden="true" />
                Remove
              </Button>
            </ModalFooter>
          </Modal>
        )}
      </>
    )
  }
}
