import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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

export default function Account(props) {
  const dispatch = useDispatch()
  const isMounted = useIsMounted()
  const user = useSelector(state => state.user)
  const [loadingEmails, setLoadingEmails] = useState(true)

  useEffect(() => {
    dispatch(fetchUserEmails())
      .then(data => {
        if (isMounted.current) {
          setLoadingEmails(false)
        }
      })
      .catch(err => {
        dispatch(
          notify({
            message: `Error fetching emails`,
            type: 'error'
          })
        )
      })

    if (user.prefs.hasSelectedDev) {
      dispatch(
        zConfirm({
          prompt:
            'Are you interested in using developer features, such as access to blueprints? You can change this any time in your account settings.',
          callback: response => {
            if (response) {
              dispatch({
                type: 'DEV_PREFS',
                payload: 1
              })
              dispatch(
                saveProfile({
                  websiteCreator: true
                })
              )
            } else {
              dispatch({
                type: 'DEV_PREFS',
                payload: 0
              })
              dispatch(
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

  useEffect(() => {
    document.title = 'Accounts: My Account'
  }, [])

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
              user={user}
              emails={user.emails}
              loadingEmails={loadingEmails}
            />
            {user.authSource === null ? (
              <>
                <Password className={styles.SettingCard} />

                <TwoFactor
                  className={styles.SettingCard}
                  dispatch={props.dispatch}
                  user={user}
                />
              </>
            ) : (
              ''
            )}
            <Preferences
              className={styles.SettingCard}
              user={user}
              dispatch={props.dispatch}
            />
          </div>
        </WithLoader>
      </div>
    </section>
  )
}
