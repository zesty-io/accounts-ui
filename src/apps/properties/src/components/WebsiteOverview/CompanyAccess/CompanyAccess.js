import { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

import { zConfirm } from '../../../../../../shell/store/confirm'
import { fetchSiteCompanies } from '../../../store/sitesCompanies'

import styles from './CompanyAccess.less'

class CompanyAccess extends Component {
  constructor(props) {
    super(props)
    console.log('CompanyAccess: ', props)
  }
  componentDidMount() {
    this.props.dispatch(fetchSiteCompanies(this.props.match.params.hash))
  }
  render() {
    return (
      <div className={styles.companyAccess}>
        <div className={styles.addCompany}>
          <div className={styles.dropdownArea}>
            <Select name="companyAccess" selection={{}} options={[]} />
          </div>
          <Button name="companyAccessSubmit">Grant Access</Button>
        </div>
        <div className={styles.companyTable}>
          <header>
            <h3>Company</h3>
            <h3>Contact</h3>
            <h3>Email</h3>
            <h3>Access</h3>
          </header>
          <main>
            <WithLoader condition={Object.keys(this.props.companies).length}>
              {Object.keys(this.props.companies).map(companyZuid => {
                let company = this.props.companies[companyZuid]
                return (
                  <article key={i}>
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
            </WithLoader>
          </main>
        </div>
      </div>
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
}

export default withRouter(
  connect((state, ownProps) => {
    return {
      companies: state.sitesCompanies[ownProps.match.params.hash] || {}
    }
  })(CompanyAccess)
)
