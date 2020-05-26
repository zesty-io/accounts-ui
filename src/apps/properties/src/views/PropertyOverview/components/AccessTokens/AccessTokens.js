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
  removeAccessToken
} from '../../../../store/sitesAccessTokens'
import { isIterable } from 'core-js'

const formatDate = date => {
  if (!date) {
    return ''
  }
  const newDate = new Date(date)
  return `${newDate.getMonth() +
    1}-${newDate.getDate()}-${newDate.getFullYear()}`
}

export default class AccessTokens extends Component {
  constructor(props) {
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
          removeAccessToken(this.props.site.ZUID, this.state.tokenToDelete)
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
    this.props
      .dispatch(renewAccessToken(name, accessTokenZUID, this.props.site.ZUID))
      .then(res => {
        if (!res.error) {
          this.props.dispatch(
            notify({
              message: `Your access token has been renovated`,
              type: 'success'
            })
          )
        } else {
          this.props.dispatch(
            notify({
              message: res.error,
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
    console.log('Token to delete', accessTokenZUID)
    this.setState({ tokenToDelete: accessTokenZUID, openConfirmModal: true })
    // this.setRemoveModalOpen(true)
  }

  renderAccessTokensActions = (index, data) => {
    const token = this.props.accessTokens.find(it => it.ZUID === data.token.key)
    const ind = this.props.accessTokens
      .map(it => it.ZUID)
      .indexOf(data.token.key)

    const accessTokenZUID = this.props.accessTokens.length > 0 && token.ZUID
    const name =
      this.props.accessTokens.length > 0 && this.props.accessTokens[ind].name

    return (
      this.props.isAdmin &&
      accessTokenZUID && (
        <p className={styles.TokenActions}>
          <Button
            className={styles.TokenAction}
            onClick={() => this.handleRenew(name, accessTokenZUID)}>
            <i className="fas fa-retweet" />
            Renew
          </Button>
          <Button
            kind="warn"
            className={styles.TokenAction}
            onClick={() => this.handleConfirmDelete(accessTokenZUID)}>
            <i className="fas fa-trash" />
          </Button>
        </p>
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
    const noTokens = [
      {
        token: (function() {
          return (
            <React.Fragment>
              <p class={styles.Token}>
                No access tokens added for this instance.
              </p>
            </React.Fragment>
          )
        })(),
        role: '',
        expires: null,
        usage: '---'
      }
    ]

    const tokensTable =
      this.props.accessTokens &&
      Array.isArray(this.props.accessTokens) &&
      this.props.accessTokens.length > 0
        ? this.props.accessTokens.map(tokenData => {
            const {
              name,
              token,
              ZUID,
              roleZUID,
              createdAt,
              expiry,
              usage
            } = tokenData
            const roleName = this.props.siteRoles.find(
              role => role.ZUID === roleZUID
            )

            return {
              token: (function() {
                return (
                  <React.Fragment key={ZUID}>
                    <p className={styles.Token}>{token}</p>
                    <p>
                      <strong className={styles.TokenMeta}>Name: </strong>
                      {name}
                    </p>
                    <p>
                      <strong className={styles.TokenMeta}>ZUID: </strong>
                      {ZUID}
                    </p>
                    <p>
                      <strong className={styles.TokenMeta}>Created: </strong>
                      {formatDate(createdAt)}
                    </p>
                  </React.Fragment>
                )
              })(),
              role: roleName.name,
              expires: formatDate(expiry),
              usage: (function() {
                return usage && usage[0] ? (
                  <p>
                    Last used on {formatDate(usage[0].happenedAt)} (
                    {usage[0].meta.message})
                  </p>
                ) : (
                  'This token has not been used yet'
                )
              })()
            }
          })
        : noTokens

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
              The{' '}
              <Url
                className={styles.Link}
                href="https://zesty.org/apis/auth-api#token-based-authentication"
                target="_blank">
                access token
              </Url>{' '}
              feature is beta and is recommended for use with the{' '}
              <Url
                className={styles.Link}
                href=" https://zesty.org/tools/atom-package"
                target="_blank">
                Atom IDE plugin
              </Url>
              , experimenting with CI/CD flows, and/or{' '}
              <Url
                className={styles.Link}
                href="https://github.com/zesty-io/node-sdk"
                target="_blank">
                Node SDK
              </Url>{' '}
              script usage. This feature will be augmented in the future. After
              that automated production flows using tokens will be generally
              available.
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
                    tokens
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
              <h2>You must copy this access token now.</h2>
              <p>
                Once this modal is closed you will not be able to retrive the
                access token again.
              </p>
              <p>
                Access tokens are secrets which should be stored securely.
                Anyone who has the token will be able to make API requests to
                this instance at the selected role &amp; permissions level.
              </p>
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
            className={styles.ConfirmModal}
            onClose={() => {
              this.setState({
                openConfirmModal: false,
                tokenToDelete: null
              })
            }}>
            <ModalContent className={styles.ModalContent}>
              <h2>Are you sure you want to delete this token?</h2>
              <p>
                Any usage of the token will be denied once it is delete. If you
                have scripts using this access token their API access will begin
                to fail.
              </p>
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
                  Cancel
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
