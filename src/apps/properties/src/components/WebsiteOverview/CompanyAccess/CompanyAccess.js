import React, { Component } from 'react'
import { connect } from 'react-redux'

import { zConfirm } from '../../../../../../shell/store/confirm'

import styles from './CompanyAccess.less'

class CompanyAccess extends Component {
  handleToggle = evt => {
    evt.preventDefault()
    this.props.dispatch(zConfirm({
      prompt: `are you sure you want to remove access from ${evt.target.name}`,
      callback: result => {
        if(!result){
          return
        }
        // make a call to remove the company
      }
    }))
  }
  render() {
    return (
      <div className={styles.companyAccess}>
        <div className={styles.addCompany}>
          <div className={styles.dropdownArea}>
          <Select
            
            name="companyAccess"
            selection={{
              value: "Design Corp",
              html: '<option value="Design Corp">Design Corp</option>'
            }}
            options={[
              {
                value: "Design Corp",
                html: '<option value="Design Corp">Design Corp</option>'
              },
              {
                value: "SEO MASTERS",
                html: '<option value="SEO MASTERS">SEO MASTERS</option>'
              }
            ]}
          />
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
            {Array.isArray(this.props.sitesCompanies[this.props.siteZUID]) ? (
              this.props.sitesCompanies[this.props.siteZUID].map((company, i) => {
                return (
                  <article key={i}>
                    <span>{company.name}</span>
                    <span>{company.mainContactName}</span>
                    <span>{company.mainContactEmail}</span>
                    <span><Toggle defaultChecked name={company.name} onChange={this.handleToggle} /></span>
                  </article>
                )
              })
            ) : (
              <Loader />
            )}
          </main>
        </div>
      </div>
    )
  }
}

export default connect(state => state)(CompanyAccess)
