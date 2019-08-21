import React from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import { Card, CardHeader, CardContent, CardFooter } from '@zesty-io/core/Card'
import { DropDownFieldType } from '@zesty-io/core/DropDownFieldType'
import { ButtonGroup } from '@zesty-io/core/ButtonGroup'
import { Button } from '@zesty-io/core/Button'

import styles from './Billing.less'
export default function Billing(props) {
  return (
    <section className={styles.Billing}>
      <h1 className={styles.BillingTitle}>
        <i className="fa fa-credit-card" aria-hidden="true" />
        &nbsp; Manage Your Account Billing
      </h1>

      <p className={styles.Description}>
        Billing is attached to an Ecosystem which contains instances. You can
        change which Ecosystem an instance is attached to at any time to update
        how it is billed.
      </p>

      <header>
        <DropDownFieldType
          className={styles.ecosystem}
          name="ecosystem"
          options={[
            {
              value: '16-000-0000',
              text: 'My Ecosystem'
            }
          ]}
          onChange={() => {
            console.log('//TODO load selected ecosystem')
          }}
        />
        <h1 className={cx(styles.total, styles.display)}>
          $000.00 / 08-21-2019
        </h1>
      </header>

      <main>
        <div className={styles.row}>
          <Card className={styles.Card}>
            <CardHeader>Payment Sources</CardHeader>
            <CardContent>
              <div>Visa ...0000 01/21</div>
            </CardContent>
            <CardFooter>
              <ButtonGroup>
                <Button kind="secondary">Add Card</Button>
                <Button kind="secondary">Add Bank</Button>
              </ButtonGroup>
            </CardFooter>
          </Card>
          <Card className={styles.Card}>
            <CardHeader>Billing Address</CardHeader>
            <CardContent>
              <h1>My Business</h1>
              <div>0000 Main St., San Diego, CA, 92101</div>
            </CardContent>
            <CardFooter>
              <Button>Edit</Button>
            </CardFooter>
          </Card>
        </div>
        <div className={styles.row}>
          <Card className={styles.Card}>
            <CardHeader>Invoice Summary</CardHeader>
            <CardContent>
              <div>TBD</div>
            </CardContent>
          </Card>
        </div>
        <div className={styles.row}>
          <Card className={styles.Card}>
            <CardHeader>Instances</CardHeader>
            <CardContent>
              <div>
                Name | Date Created <Button kind="warn">Remove</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </section>
  )
}
