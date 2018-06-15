import react, { Component } from 'react'
import { connect } from 'react-redux'

import styles from './Preferences.less'
import { saveProfile } from '../../../../../../../shell/store/user'

class Preferences extends Component {
  render() {
    return (
      <Card className={styles.Preferences}>
        <CardHeader>
          <h1>Preferences</h1>
        </CardHeader>
        <CardContent className={styles.CardContent}>
          <p>
            Account views can be customized by selecting from the options below
          </p>
          <article className={styles.PrefItem}>
            Manage Blueprints
            <Toggle name="blueprints" onChange={this.handleChange} checked={this.props.user.prefs.devOptions}/>
          </article>
        </CardContent>
        <CardFooter />
      </Card>
    )
  }
  handleChange = evt => {
    this.props.dispatch({
      type: 'DEV_PREFS',
      payload: evt.target.checked ? 1 : 0
    })
    this.props.dispatch(
      saveProfile()
    )
  }
}

export default connect(state => state)(Preferences)
