import { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

import { zConfirm } from '../../../../../../../shell/store/confirm'
import { fetchSiteCompanies } from '../../../../store/sitesCompanies'

import styles from './CompanyAccess.less'

export default class CompanyAccess extends Component {
  constructor(props) {
    super(props)
    this.state = {
      team: '',
      role: ''
    }
  }
  componentWillMount() {
    this.props.dispatch(fetchSiteCompanies(this.props.match.params.siteZUID))
  }
  render() {
    return (
      <Card>
        <CardHeader>
          <h2>
            <i className="fa fa-building" aria-hidden="true" />
            &nbsp;Team Access
          </h2>
        </CardHeader>
        <CardContent>
          <div className={styles.companyAccess}>
            {this.props.isAdmin ? (
              <React.Fragment>
                <p>
                  By providing a team access you can allow an external group of
                  users access to manage your instance. For example; this is can
                  be used to provide an agency with access to manage your
                  website.
                </p>
                <div className={styles.addCompany}>
                  <Input
                    placeholder="Enter team ID"
                    onChange={this.handleTream}
                  />
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
                  <Button name="companyAccessSubmit">Grant Access</Button>
                </div>
              </React.Fragment>
            ) : null}
            <div className={styles.companyTable}>
              <header>
                <h3>Team</h3>
                <h3>Contact</h3>
                <h3>Email</h3>
                <h3>Access</h3>
              </header>
              <main>
                <WithLoader
                  condition={!this.props.loadingTeams}
                  message="Loading Instance Teams"
                  height="100px"
                  width="100%"
                >
                  {Object.keys(this.props.companies).map(ZUID => {
                    let company = this.props.companies[ZUID]
                    return (
                      <article key={ZUID}>
                        <span>{company.name}</span>
                        <span>{company.mainContactName}</span>
                        <span>{company.mainContactEmail}</span>
                        <span>
                          <Toggle
                            defaultChecked
                            name={company.name}
                            onChange={this.handleToggle}
                          />
                        </span>
                      </article>
                    )
                  })}

                  {!Object.keys(this.props.companies).length &&
                  !this.props.loadingTeams ? (
                    <article>
                      <em>No team access added for this instance.</em>
                    </article>
                  ) : null}
                </WithLoader>
              </main>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }
  handleToggle = evt => {
    evt.preventDefault()
    this.props.dispatch(
      zConfirm({
        prompt: `are you sure you want to remove access from ${
          evt.target.name
        }`,
        callback: result => {
          if (!result) {
            return
          }
          // make a call to remove the company
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
}
