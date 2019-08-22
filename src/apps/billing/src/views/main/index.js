import React, { useEffect } from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import { withRouter, Switch, Route } from 'react-router-dom'

import { fetchEcosystems } from '../../../../../shell/store/ecosystems'

import { EditEcosystem } from '../../components/EditEcosystem'
import { CreateEcosystem } from '../../components/CreateEcosystem'

import { Card, CardHeader, CardContent, CardFooter } from '@zesty-io/core/Card'
import { DropDownFieldType } from '@zesty-io/core/DropDownFieldType'
import { ButtonGroup } from '@zesty-io/core/ButtonGroup'
import { Button } from '@zesty-io/core/Button'

import styles from './Billing.less'
export default withRouter(
  connect(state => state)(
    class Billing extends React.PureComponent {
      componentDidMount() {
        console.log('Billing', this.props)
        this.props.dispatch(fetchEcosystems())
      }

      render() {
        return (
          <section className={styles.Billing}>
            <h1 className={styles.BillingTitle}>
              <i className="fa fa-credit-card" aria-hidden="true" />
              &nbsp; Manage Your Account Billing
            </h1>

            <p className={styles.Description}>
              Billing is attached to an Ecosystem which contains instances. You
              can change which Ecosystem an instance is attached to at any time
              to update how it is billed.
            </p>

            <header>
              <DropDownFieldType
                className={styles.ecosystem}
                name="ecosystem"
                options={this.props.ecosystems.map(eco => {
                  return {
                    value: eco.ZUID,
                    text: eco.name
                  }
                })}
                onChange={(name, value) => {
                  this.props.history.push(`/billing/${value}`)
                }}
              />
              <h1 className={cx(styles.total, styles.display)}>
                $000.00 / 08-21-2019
              </h1>
            </header>

            <Switch>
              <Route path="/billing/:id" component={EditEcosystem} />
              <Route path="/billing" component={CreateEcosystem} />
            </Switch>
          </section>
        )
      }
    }
  )
)
