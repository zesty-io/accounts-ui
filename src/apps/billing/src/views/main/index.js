import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import { Card, CardHeader, CardContent, CardFooter } from '@zesty-io/core/Card'

// export default connect(state => state)(
//   class Billing extends Component {
//     render() {
//       return <section>Billing App</section>
//     }
//   }
// )

export default function Billing(props) {
  return (
    <section>
      <h1>Billing Cards</h1>
      <p></p>
      <Card>
        <CardHeader>Ecosystem 1</CardHeader>
        <CardContent>
          <p>Card Holder: Stuart H. Runyan</p>
          <p>Card Number: 0000-0000-0000-0000</p>
          <p> Card Experation: 03/22</p>
        </CardContent>
        <CardFooter>
          <Button
            kind="warn"
            onClick={() => console.log('//TODO remove credit card onfile')}>
            <i className="fa fa-trash"></i>Remove
          </Button>
        </CardFooter>
      </Card>
    </section>
  )
}
