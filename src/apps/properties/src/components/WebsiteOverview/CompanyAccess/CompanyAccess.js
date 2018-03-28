import React, { Component } from 'react'
import { connect } from 'react-redux'

import styles from './CompanyAccess.less'

class CompanyAccess extends Component {
  render() {
    return (
      <div className={styles.companyAccess}>
        <div className={styles.dropdown}>
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
          <Button name="companyAccessSubmit">Grant Access</Button>
        </div>
        <div className={styles.companyTable}>
          <header>
            <h3>Company</h3>
            <h3>Contact</h3>
            <h3>Access</h3>
          </header>
          <main>
            {Array.isArray(this.props.sitesCompanies) ? (
              this.props.sitesCompanies.map((company, i) => {
                return (
                  <article key={i}>
                    <span>{company.Name}</span>
                    <span>{company.MainContactEmail}</span>
                    <span><Toggle /></span>
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
