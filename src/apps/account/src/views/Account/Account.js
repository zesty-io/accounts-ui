import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import useIsMounted from 'ismounted'

import { fetchUserEmails, saveProfile } from '../../../../../shell/store/user'
import { notify } from '../../../../../shell/store/notifications'
import { zConfirm } from '../../../../../shell/store/confirm'

import Profile from './components/Profile'
import Email from './components/Email'
import Password from './components/Password'
import TwoFactor from './components/TwoFactor'
import { Preferences } from './components/Preferences'

import { WithLoader } from '@zesty-io/core/WithLoader'

import styles from './Account.less'

export default connect(state => {})(function Account(props) {
  const [loadingEmails, setLoadingEmails] = useState(true)
  const isMounted = useIsMounted()

  useEffect(() => {
    props
      .dispatch(fetchUserEmails())
      .then(data => {
        if (isMounted.current) {
          setLoadingEmails(false)
        }
      })
      .catch(err => {
        props.dispatch(
          notify({
            message: `Error fetching emails`,
            type: 'error'
          })
        )
      })

    if (props.user.prefs.hasSelectedDev) {
      props.dispatch(
        zConfirm({
          prompt:
            'Are you interested in using developer features, such as access to blueprints? You can change this any time in your account settings.',
          callback: response => {
            if (response) {
              props.dispatch({
                type: 'DEV_PREFS',
                payload: 1
              })
              props.dispatch(
                saveProfile({
                  websiteCreator: true
                })
              )
            } else {
              props.dispatch({
                type: 'DEV_PREFS',
                payload: 0
              })
              props.dispatch(
                saveProfile({
                  websiteCreator: false
                })
              )
            }
          }
        })
      )
    }
  }, [])

  document.title = 'Accounts: My Account'
  return (
    <section className={styles.Settings}>
      <h1 className={styles.SettingsTitle}>Manage Your Account Settings</h1>
      <div className={styles.setting}>
        <WithLoader
          className={styles.Loading}
          condition={!loadingEmails}
          message="Loading Your Account Data">
          <div className={styles.SettingCards}>
            <Profile className={styles.SettingCard} />
            <Email
              className={styles.SettingCard}
              dispatch={props.dispatch}
              user={props.user}
              emails={props.user.emails}
              loadingEmails={loadingEmails}
            />
            {props.user.authSource === null ? (
              <>
                <Password
                  history={props.history}
                  className={styles.SettingCard}
                />
                <TwoFactor
                  className={styles.SettingCard}
                  dispatch={props.dispatch}
                  user={props.user}
                />
              </>
            ) : (
              ''
            )}
            <Preferences
              className={styles.SettingCard}
              user={props.user}
              dispatch={props.dispatch}
            />
          </div>
        </WithLoader>
      </div>
    </section>
  )
})
