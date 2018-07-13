import { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

import { zConfirm } from '../../../../../../../shell/store/confirm'
import {
  fetchSiteTeams,
  addTeamToInstance,
  removeTeamFromInstance
} from '../../../../store/sitesTeams'

import styles from './CompanyAccess.less'
import { notify } from '../../../../../../../shell/store/notifications'
import { fetchSiteUsers } from '../../../../store/sitesUsers'

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
    this.props.dispatch(fetchSiteTeams(this.props.match.params.siteZUID))
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
              </p>
              <div className={styles.addCompany}>
                <Input placeholder="Enter team ID" onChange={this.handleTeam} />
                <Select onSelect={this.handleRole}>
                  <Option key="default" value="" text="Select Role" />
                  {this.props.siteRoles.map(role => {
                    return (
                      <Option
                        key={role.ZUID}
                        value={role.ZUID}
                        text={role.name}
                      />
                    )
                  })}
                </Select>
                <Button
                  name="companyAccessSubmit"
                  onClick={this.handleAddTeam}
                  disabled={this.state.submitted}>
                  Grant Access
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
                {Object.keys(this.props.teams).map(ZUID => {
                  let team = this.props.teams[ZUID]
                  return (
                    <article key={ZUID}>
                      <span>{team.name}</span>
                      <span>{team.description}</span>
                      <span>
                        {this.props.isAdmin && (
                          <i
                            className={`fa fa-trash-o ${
                              this.state.removing ? styles.hidden : styles.trash
                            }`}
                            onClick={() => this.handleRemove(team)}
                          />
                        )}
                      </span>
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
        prompt: `Are you sure you want to remove access for the team: ${
          team.name
        }?`,
        callback: confirmed => {
          if (confirmed) {
            this.props.dispatch(
              removeTeamFromInstance(this.props.siteZUID, team.ZUID)
            )
            this.setState({ removing: false })
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
  handleRole = evt => {
    this.setState({
      role: evt.target.dataset.value
    })
  }
  handleAddTeam = () => {
    this.setState({
      submitted: true
    })
    this.props
      .dispatch(
        addTeamToInstance(this.props.siteZUID, this.state.team, this.state.role)
      )
      .then(data => {
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
        this.props.dispatch(fetchSiteUsers(this.props.siteZUID))
      })
      .catch(() => {
        this.setState({
          submitted: false
        })
        this.props.dispatch(
          notify({
            type: 'error',
            message: 'Team failed to add'
          })
        )
      })
  }
}
