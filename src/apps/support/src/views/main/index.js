import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import SupportOptions from '../../components/SupportOptions'
import BugReport from '../../components/BugReport'

class Support extends Component {
  render() {
    document.title = 'Accounts: Support'
    return (
      <section>
        <Switch>
          <Route path="/support/bugreport" component={BugReport} />
          <Route path="/support" component={SupportOptions} />
        </Switch>
      </section>
    )
  }
}

export default connect(state => state)(Support)
