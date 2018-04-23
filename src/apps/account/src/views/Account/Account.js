import { Fragment } from 'react'

import Profile from './Profile'
import Email from './Email'
import Preferences from './Preferences'

import styles from './Account.less'

const Account = () => {
  return (
    <div className={styles.Account}>
      <article className={styles.AccountSetting}>
        {/* <h2 className={styles.title}>Profile</h2> */}
        <Profile />
      </article>
      <article className={styles.AccountSetting}>
        {/* <h2 className={styles.title}>Emails</h2> */}
        <Email />
      </article>
      {/* <article className={styles.AccountSetting}>
        <h2 className={styles.title}>Preferences</h2>
        <Preferences />
      </article> */}
    </div>
  )
}

export default Account
