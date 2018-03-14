import React, { Component } from 'react'
import { connect } from 'react-redux'

class CompanyAccess extends Component {
  render() {
    return (
      <div>
      <Select name='companyAccess'
        selection={{
          value: 'Company', html: '<option value="Company">Company</option>'
        }}
        options={[
            { value: 'company', html: '<option value="Company">Company</option>'},
            { value: 'Company2', html: '<option value="Company2">Company2</option>'}
          ]}
      />
      <Button name='companyAccessSubmit'>Grant Access</Button>
        <table className="users">
          <tbody>
            <tr>
              <th>#</th>
              <th>Company</th>
              <th>Active</th>
              <th>Boss</th>
            </tr>
            
                <tr>
                  <td>1</td>
                  <td>GoodCompany</td>
                  <td>X</td>
                  <td>X</td>
                </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default connect(state => state)(CompanyAccess)