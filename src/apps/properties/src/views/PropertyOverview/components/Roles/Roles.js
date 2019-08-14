import React, { Component } from 'react'
import { Route } from 'react-router'

import { notify } from '../../../../../../../shell/store/notifications'
import { zConfirm } from '../../../../../../../shell/store/confirm'
import {
  // fetchSiteRoles,
  // createRole,
  removeRole
  // getRole
} from '../../../../store/sitesRoles'

// import Modal from '../../../../../../../shell/components/Modal'

import { Card, CardHeader, CardContent, CardFooter } from '@zesty-io/core/Card'
import { AppLink } from '@zesty-io/core/AppLink'
import { Button } from '@zesty-io/core/Button'

import EditRole from './components/EditRole'
import RoleCreate from './components/RoleCreate'

import styles from './Roles.less'
const formatDate = date => {
  if (!date) {
    return ''
  }
  const newDate = new Date(date)
  return `${newDate.getMonth() +
    1}-${newDate.getDate()}-${newDate.getFullYear()}`
}

export default class Roles extends Component {
  render() {
    return (
      <Card className={styles.Roles}>
        <CardHeader>
          <h2>
            <i className="fa fa-lock" aria-hidden="true" />
            &nbsp;Custom Site Roles
          </h2>
        </CardHeader>
        <CardContent>
          <div>
            <Route
              exact
              path={`/instances/:siteZUID/role/:roleZUID`}
              component={EditRole}
            />
            <p>
              By creating custom roles you can have fine grained control over
              what content specific users can access and what actions they can
              take.
            </p>
            <RoleCreate
              dispatch={this.props.dispatch}
              systemRoles={this.props.systemRoles}
              siteZUID={this.props.siteZUID}
            />
            {/* <Divider /> */}
            <div className={styles.currentRoles}>
              <header>
                <h3>Role</h3>
                <h3>Created</h3>
                <h3>Expires</h3>
              </header>
              <main>
                {this.props.siteRoles.map(role => {
                  return (
                    <article key={role.ZUID}>
                      <span>{role.name}</span>
                      <span>{formatDate(role.createdAt)}</span>
                      <span>{formatDate(role.expiry)}</span>
                      <span>
                        <ButtonGroup>
                          <AppLink
                            to={`${this.props.match.url}role/${role.ZUID}`}>
                            <i className="fa fa-pencil" aria-hidden="true" />
                            &nbsp;Edit
                          </AppLink>
                          <Button onClick={() => this.handleRemove(role.ZUID)}>
                            <i className="fa fa-trash-o" aria-hidden="true" />
                            Remove
                          </Button>
                        </ButtonGroup>
                      </span>
                    </article>
                  )
                })}
              </main>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }
  handleRemove = ZUID => {
    this.props.dispatch(
      zConfirm({
        prompt: 'Are you certain you want to delete this role?',
        callback: result => {
          // remove role if user confirms
          if (result) {
            this.props
              .dispatch(removeRole(ZUID, this.props.siteZUID))
              .then(data => {
                this.props.dispatch(
                  notify({
                    message: 'Role successfully deleted',
                    type: 'success'
                  })
                )
              })
              .catch(() => {
                this.props.dispatch(
                  notify({ message: 'Error deleting role', type: 'error' })
                )
              })
          }
        }
      })
    )
  }
}
