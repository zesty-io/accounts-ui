import React from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

// import { Card, CardHeader, CardContent, CardFooter } from '@zesty-io/core'

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

      <div className={styles.CreditCards}>
        <Card className={styles.CreditCard}>
          <CardHeader>Ecosystem 2</CardHeader>
          <CardContent className={styles.AddBilling}>
            <Button
              type="save"
              onClick={() => console.log('//TODO add credit card')}>
              <i className="fa fa-trash"></i>Add Billing
            </Button>
          </CardContent>
          {/* <CardFooter></CardFooter> */}
        </Card>
        <Card className={styles.CreditCard}>
          <CardHeader>Ecosystem 1</CardHeader>
          <CardContent className={styles.CardContent}>
            <p>
              Card Holder: <strong>Stuart H. Runyan</strong>
            </p>
            <p>
              Card Number: <strong>0000-0000-0000-0000</strong>
            </p>
            <p>
              Card Experation: <strong>03/22</strong>
            </p>
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => console.log('//TODO remove credit card onfile')}>
              <i className="fa fa-trash"></i>Remove
            </Button>
          </CardFooter>
        </Card>
        <Card className={styles.CreditCard}>
          <CardHeader>Ecosystem 1</CardHeader>
          <CardContent className={styles.CardContent}>
            <p>
              Card Holder: <strong>Stuart H. Runyan</strong>
            </p>
            <p>
              Card Number: <strong>0000-0000-0000-0000</strong>
            </p>
            <p>
              Card Experation: <strong>03/22</strong>
            </p>
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => console.log('//TODO remove credit card onfile')}>
              <i className="fa fa-trash"></i>Remove
            </Button>
          </CardFooter>
        </Card>
        <Card className={styles.CreditCard}>
          <CardHeader>Ecosystem 1</CardHeader>
          <CardContent className={styles.CardContent}>
            <p>
              Card Holder: <strong>Stuart H. Runyan</strong>
            </p>
            <p>
              Card Number: <strong>0000-0000-0000-0000</strong>
            </p>
            <p>
              Card Experation: <strong>03/22</strong>
            </p>
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => console.log('//TODO remove credit card onfile')}>
              <i className="fa fa-trash"></i>Remove
            </Button>
          </CardFooter>
        </Card>
        <Card className={styles.CreditCard}>
          <CardHeader>Ecosystem 1</CardHeader>
          <CardContent className={styles.CardContent}>
            <p>
              Card Holder: <strong>Stuart H. Runyan</strong>
            </p>
            <p>
              Card Number: <strong>0000-0000-0000-0000</strong>
            </p>
            <p>
              Card Experation: <strong>03/22</strong>
            </p>
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => console.log('//TODO remove credit card onfile')}>
              <i className="fa fa-trash"></i>Remove
            </Button>
          </CardFooter>
        </Card>
        <Card className={styles.CreditCard}>
          <CardHeader>Ecosystem 1</CardHeader>
          <CardContent className={styles.CardContent}>
            <p>
              Card Holder: <strong>Stuart H. Runyan</strong>
            </p>
            <p>
              Card Number: <strong>0000-0000-0000-0000</strong>
            </p>
            <p>
              Card Experation: <strong>03/22</strong>
            </p>
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => console.log('//TODO remove credit card onfile')}>
              <i className="fa fa-trash"></i>Remove
            </Button>
          </CardFooter>
        </Card>
        <Card className={styles.CreditCard}>
          <CardHeader>Ecosystem 1</CardHeader>
          <CardContent className={styles.CardContent}>
            <p>
              Card Holder: <strong>Stuart H. Runyan</strong>
            </p>
            <p>
              Card Number: <strong>0000-0000-0000-0000</strong>
            </p>
            <p>
              Card Experation: <strong>03/22</strong>
            </p>
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => console.log('//TODO remove credit card onfile')}>
              <i className="fa fa-trash"></i>Remove
            </Button>
          </CardFooter>
        </Card>
        <Card className={styles.CreditCard}>
          <CardHeader>Ecosystem 1</CardHeader>
          <CardContent className={styles.CardContent}>
            <p>
              Card Holder: <strong>Stuart H. Runyan</strong>
            </p>
            <p>
              Card Number: <strong>0000-0000-0000-0000</strong>
            </p>
            <p>
              Card Experation: <strong>03/22</strong>
            </p>
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => console.log('//TODO remove credit card onfile')}>
              <i className="fa fa-trash"></i>Remove
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  )
}
