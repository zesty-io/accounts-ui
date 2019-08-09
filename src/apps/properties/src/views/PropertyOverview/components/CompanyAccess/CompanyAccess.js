import React, { Component } from 'react'
import cx from 'classnames'

import { zConfirm } from '../../../../../../../shell/store/confirm'
import {
  fetchSiteTeams,
  addTeamToInstance,
  removeTeamFromInstance
} from '../../../../store/sitesTeams'

import { notify } from '../../../../../../../shell/store/notifications'
import { fetchSiteUsers } from '../../../../store/sitesUsers'

import { WithLoader } from '@zesty-io/core/WithLoader'
import { Card, CardHeader, CardContent, CardFooter } from '@zesty-io/core/Card'
import { AppLink } from '@zesty-io/core/AppLink'
import { DropDownFieldType } from '@zesty-io/core/DropDownFieldType'
import { Input } from '@zesty-io/core/Input'
import { Button } from '@zesty-io/core/Button'

import styles from './CompanyAccess.less'
export default class CompanyAccess extends Component {
  constructor(props) {
    super(props)
    this.state = {
      team: '',
      role: '',
      submitted: false
    }
  }
  componentDidMount() {
    this.props
      .dispatch(fetchSiteTeams(this.props.match.params.siteZUID))
      .catch(() => {
        this.props.dispatch(
          notify({ message: 'Error fetching teams', type: 'error' })
        )
      })
  }
  render() {
    return (
      <Card className={styles.TeamAccess}>
        <CardHeader>
          <h2>
            <i className="fa fa-building" aria-hidden="true" />
            &nbsp;Team Access
          </h2>
        </CardHeader>
        <CardContent>
          {this.props.isAdmin ? (
            <React.Fragment>
              <p>
                By providing a team access you can allow an external group of
                users access to manage your instance. For example: this can be
                used to provide an agency with access to manage your website.
                <AppLink to="/teams">&nbsp;Learn more about teams</AppLink>
              </p>
              <div className={styles.addCompany} data-test="teamInvite">
                <span>
                  <Input
                    name="teamZUID"
                    placeholder="Enter team ID"
                    onChange={this.handleTeam}
                  />
                </span>

                <DropDownFieldType
                  name="siteRoles"
                  defaultValue=""
                  defaultText="- Select Role -"
                  onChange={this.handleRole}
                  options={this.props.siteRoles.map(role => {
                    return {
                      key: role.ZUID,
                      value: role.ZUID,
                      text: role.name
                    }
                  })}
                />

                <Button
                  name="companyAccessSubmit"
                  onClick={this.handleAddTeam}
                  disabled={this.state.submitted}>
                  <i className="fas fa-users"></i>
                  Add Team
                </Button>
              </div>
            </React.Fragment>
          ) : null}
          <div className={styles.companyTable}>
            <header>
              <h3>Team</h3>
              <h3>Description</h3>
              <h3>Access</h3>
            </header>
            <main>
              <WithLoader
                condition={!this.props.loadingTeams}
                message="Loading Instance Teams"
                height="100px"
                width="100%">
                {Object.keys(this.props.teams).map(teamZUID => {
                  let team = this.props.teams[teamZUID]
                  return (
                    <article key={teamZUID}>
                      <span>{team.name}</span>
                      <span>{team.description}</span>
                      <span>
                        {this.props.isAdmin && (
                          <Button
                            data-test="removeTeam"
                            onClick={() => this.handleRemove(team)}>
                            <i
                              className={`fa fa-trash-o ${
                                this.state.removing
                                  ? styles.hidden
                                  : styles.trash
                              }`}
                            />
                            &nbsp;Remove Team
                          </Button>
                        )}
                      </span>

                      <article className={styles.TeamMembers}>
                        {Object.keys(this.props.users)
                          .filter(userZUID => {
                            return (
                              this.props.users[userZUID].teamZUID === team.ZUID
                            )
                          })
                          .map(userZUID => {
                            return (
                              <React.Fragment key={userZUID}>
                                <span>{this.props.users[userZUID].email}</span>
                                <span>
                                  {this.props.users[userZUID].firstName}&nbsp;
                                  {this.props.users[userZUID].lastName}
                                </span>
                                <span>
                                  {this.props.users[userZUID].role.name}
                                </span>
                              </React.Fragment>
                            )
                          })}
                      </article>
                    </article>
                  )
                })}

                {!Object.keys(this.props.teams).length &&
                !this.props.loadingTeams ? (
                  <article>
                    <em>No team access added for this instance.</em>
                  </article>
                ) : null}
              </WithLoader>
            </main>
          </div>
        </CardContent>
      </Card>
    )
  }
  handleRemove = team => {
    this.setState({ removing: true })
    this.props.dispatch(
      zConfirm({
        kind: 'warn',
        prompt: `Are you sure you want to remove access for the team: ${team.name}?`,
        callback: confirmed => {
          if (confirmed) {
            this.props
              .dispatch(removeTeamFromInstance(this.props.siteZUID, team.ZUID))
              .then(() => {
                this.setState({ removing: false })
                this.props.dispatch(
                  notify({
                    type: 'success',
                    message: `${team.name} was removed`
                  })
                )
              })
              .catch(err => {
                this.setState({ removing: false })
                this.props.dispatch(
                  notify({
                    type: 'error',
                    message: `Failed to remove ${team.name}`
                  })
                )
              })
          }
        }
      })
    )
  }
  handleTeam = evt => {
    this.setState({
      team: evt.target.value
    })
  }
  handleRole = (name, value) => {
    this.setState({
      role: value
    })
  }
  handleAddTeam = () => {
    if (!this.state.role || !this.state.team) {
      return this.props.dispatch(
        notify({
          type: 'error',
          message: `You must select a role and a team`
        })
      )
    }
    this.setState({
      submitted: true
    })
    this.props
      .dispatch(
        addTeamToInstance(this.props.siteZUID, this.state.team, this.state.role)
      )
      .then(data => {
        if (data && !data.error) {
          this.setState({
            team: '',
            role: '',
            submitted: false
          })
          this.props.dispatch(
            notify({
              type: 'success',
              message: 'Team successfully added'
            })
          )
          this.props.dispatch(fetchSiteTeams(this.props.siteZUID))
          this.props.dispatch(fetchSiteUsers(this.props.siteZUID)).catch(() => {
            this.props.dispatch(
              notify({ message: 'Error fetching users', type: 'error' })
            )
          })
        } else {
          this.setState({
            submitted: false
          })
          this.props.dispatch(
            notify({
              type: 'error',
              message: `Team failed to add`
            })
          )
        }
      })
      .catch(err => {
        this.setState({
          submitted: false
        })
        this.props.dispatch(
          notify({
            type: 'error',
            message: `Team failed to add`
          })
        )
      })
  }
}
