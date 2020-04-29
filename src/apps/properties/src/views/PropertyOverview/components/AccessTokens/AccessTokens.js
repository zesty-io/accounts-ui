import React, { Component, useState } from 'react'
import { connect } from 'react-redux'
import { notify } from '../../../../../../../shell/store/notifications'

import Table from '../../../../components/Table'
import { Card, CardHeader, CardContent, CardFooter } from '@zesty-io/core/Card'
import { Modal, ModalContent, ModalFooter } from '@zesty-io/core/Modal'
import { Url } from '@zesty-io/core/Url'
import { Button } from '@zesty-io/core/Button'

import styles from './AccessTokens.less'
import NewAccessToken from '../NewAccessToken'
import {
  renewAccessToken,
  getUsageToken,
  removeDomain
} from '../../../../store/sitesAccessTokens'

const formatDate = date => {
  if (!date) {
    return ''
  }
  const newDate = new Date(date)
  return `${newDate.getMonth() +
    1}-${newDate.getDate()}-${newDate.getFullYear()}`
}

const getUsage = ZUID => {
  console.log('ZUID', ZUID)
  getUsageToken(ZUID)
    .then(res => console.log('RES', res))
    .catch(err => console.log('ERR', err))
  return ''
}

export default class AccessTokens extends Component {
  constructor(props) {
    console.log('PROS!!!', props)
    super(props)
    this.state = {
      openNewTokenModal: false,
      openConfirmModal: false,
      tokenToRenew: null,
      tokenToDelete: null,
      newToken: null,
      copied: false
    }
  }

  setOpenNewTokenModal = openNewTokenModal => {
    this.setState({ openNewTokenModal })
  }

  setNewToken = newToken => {
    this.setState({ newToken })
    this.setOpenNewTokenModal(true)
  }

  handleRemove = () => {
    if (this.state.tokenToDelete) {
      this.props
        .dispatch(
          // removeAccessToken(this.props.site.ZUID, this.state.tokenToDelete)
          removeDomain(this.props.site.ZUID, this.state.tokenToDelete)
        )
        .then(({ error, accessToken }) => {
          this.props.dispatch(
            notify({
              message: `Your access token has been removed`,
              type: 'success'
            })
          )
          this.setState({ tokenToDelete: null, openConfirmModal: false })
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

  handleRenew = (name, accessTokenZUID) => {
    // this.setState({ tokenToRenew: accessTokenZUID })
    // this.setRemoveModalOpen(true)
    this.props
      .dispatch(
        // renewAccessToken(this.props.site.ZUID, this.state.tokenToRenew)
        renewAccessToken(name, accessTokenZUID)
      )
      .then(res => {
        if (!res) {
          this.props.dispatch(
            notify({
              message: `Your access token has been renovated`,
              type: 'success'
            })
          )
        } else {
          this.props.dispatch(
            notify({
              message: JSON.stringify(res),
              type: 'error'
            })
          )
        }
        // this.setState({ tokenToRenew: null, openRemoveModal: false })
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

  handleConfirmDelete = accessTokenZUID => {
    this.setState({ tokenToDelete: accessTokenZUID, openConfirmModal: true })
    // this.setRemoveModalOpen(true)
  }

  renderAccessTokensActions = index => {
    const accessTokenZUID =
      this.props.accessTokens.length > 0 && this.props.accessTokens[index].ZUID
    const name =
      this.props.accessTokens.length > 0 && this.props.accessTokens[index].name
    const expiry =
      this.props.accessTokens.length > 0 &&
      this.props.accessTokens[index].expiry

    return (
      this.props.isAdmin &&
      accessTokenZUID && (
        <>
          <Button
            kind="save"
            className={styles.delete}
            onClick={() => this.handleRenew(name, accessTokenZUID)}>
            <i className="fas fa-retweet" />
          </Button>
          <Button
            kind="warn"
            className={styles.delete}
            onClick={() => this.handleConfirmDelete(accessTokenZUID)}>
            <i className="fas fa-trash" />
          </Button>
        </>
      )
    )
  }

  handleCopy = e => {
    this.setState({ copied: false })
    this.tokenRef.select()
    document.execCommand('copy')
    e.target.focus()
    this.setState({ copied: true })
  }

  render() {
    const tokensTable =
      this.props.accessTokens &&
      Array.isArray(this.props.accessTokens) &&
      this.props.accessTokens.length > 0
        ? this.props.accessTokens.map(tokenData => {
            const { name, token, ZUID, roleZUID, createdAt, expiry } = tokenData
            const roleName = this.props.siteRoles.find(
              role => role.ZUID === roleZUID
            )

            return {
              token: (function() {
                return (
                  <>
                    <p>{token}</p>
                    <p>{name}</p>
                    <p>{ZUID}</p>
                    <p>{createdAt}</p>
                  </>
                )
              })(),
              role: roleName.name,
              expires: formatDate(expiry)
              // usage: getUsage(ZUID)
            }
          })
        : [
            {
              token: 'No access tokens added for this instance.',
              role: null
            }
          ]

    return (
      <>
        <Card className={styles.Meta}>
          <CardHeader className={styles.CardHeader}>
            <h2>
              <i className="fa fa-code" aria-hidden="true" />
              &nbsp;Access Tokens
            </h2>
          </CardHeader>
          <CardContent className={styles.CardContent}>
            <p>
              The access token feature is beta and is recommended for use with
              the ATOM IDE plugin, experimenting with CI/CD flows, and/or Node
              SDK script usage. This feature will be augmented in the future.
              After that automated production flows using tokens will be
              generally available.
            </p>
            <div className={styles.TableAction}>
              {this.props.isAdmin ? (
                <NewAccessToken
                  siteZUID={this.props.site.ZUID}
                  site={this.props.site}
                  dispatch={this.props.dispatch}
                  siteRoles={this.props.siteRoles}
                  setNewToken={this.setNewToken}
                />
              ) : (
                <p className={styles.domain}>
                  <em>
                    <i
                      className="fa fa-exclamation-triangle"
                      aria-hidden="true"
                    />
                    &nbsp; You must be this instance's owner or admin to manage
                    domains
                  </em>
                </p>
              )}
            </div>
            {this.props.accessTokens ? (
              <Table
                data={tokensTable}
                siteZUID={this.props.site.ZUID}
                dispatch={this.props.dispatch}
                isAdmin={this.props.isAdmin}
                actions={this.renderAccessTokensActions}
              />
            ) : (
              <em>Ask your instance owner to create access tokens</em>
            )}
          </CardContent>
        </Card>
        {this.state.openNewTokenModal && (
          <Modal
            className={styles.Modal}
            onClose={() => this.setOpenNewTokenModal(false)}>
            <ModalContent className={styles.ModalContent}>
              <h2>You have successfully created a new token</h2>
              <p>Your access token will only be visible once here.</p>
              <div className={styles.TokenDisplay}>
                <textarea
                  className={styles.TokenArea}
                  ref={tokenRef => (this.tokenRef = tokenRef)}>
                  {this.state.newToken}
                </textarea>
                <Button data-test="copy" kind="save" onClick={this.handleCopy}>
                  <i className="fas fa-copy" aria-hidden="true" />
                  Copy
                </Button>
                {this.state.copied && (
                  <p className={styles.CopySuccess}>Copied!</p>
                )}
              </div>
            </ModalContent>
          </Modal>
        )}

        {this.state.openConfirmModal && (
          <Modal
            className={styles.Modal}
            onClose={() => this.setOpenNewTokenModal(false)}>
            <ModalContent className={styles.ModalContent}>
              <h2>Are you sure?</h2>
              <p>Do you want to remove this token?</p>
              {/* <div className={styles.TokenDisplay}>
                <Button data-test="copy" kind="save" onClick={this.handleCopy}>
                  <i className="fas fa-copy" aria-hidden="true" />
                  Copy
                </Button>
              </div> */}
            </ModalContent>
            <ModalFooter>
              <div className={styles.ButtonsConfirm}>
                <Button
                  kind="save"
                  onClick={() =>
                    this.setState({
                      openConfirmModal: false,
                      tokenToDelete: null
                    })
                  }>
                  No
                </Button>
                <Button kind="warn" onClick={this.handleRemove}>
                  Yes
                </Button>
              </div>
            </ModalFooter>
          </Modal>
        )}
      </>
    )
  }
}
