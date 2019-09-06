import React, { useEffect } from 'react'
import cx from 'classnames'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { fetchEcosystem } from '../../../../../shell/store/ecosystems'

import { Card, CardHeader, CardContent, CardFooter } from '@zesty-io/core/Card'
import { DropDownFieldType } from '@zesty-io/core/DropDownFieldType'
import { ButtonGroup } from '@zesty-io/core/ButtonGroup'
import { Button } from '@zesty-io/core/Button'

import styles from './EditEcosystem.less'
export default connect(state => state)(function EditEcosystem(props) {
  console.log('EditEcosystem', props)

  useEffect(() => {
    props.dispatch(fetchEcosystem(props.match.params.id))
  }, [])

  return (
    <main className={styles.EditEcosystem}>
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
  )
})
