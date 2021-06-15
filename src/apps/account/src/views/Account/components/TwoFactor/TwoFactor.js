import React, { useState } from 'react'
import { zConfirm } from '../../../../../../../shell/store/confirm'
import { update2fa } from '../../../../../../../shell/store/user'
import { notify } from '../../../../../../../shell/store/notifications'

import { Card, CardHeader, CardContent, CardFooter } from '@zesty-io/core/Card'
import { Input } from '@zesty-io/core/Input'
import { Button } from '@zesty-io/core/Button'
import { Url } from '@zesty-io/core/Url'

import styles from './TwoFactor.less'
import { render } from 'less'
export default function TwoFactorOptions(props) {
  const [submitted, setSubmitted] = useState(false)
  const [authyPhoneCountryCode, setauthyPhoneCountryCode] = useState('')
  const [authyPhoneNumber, setauthyPhoneNumber] = useState('')

  //Country Code
  const handleAuthyPhoneCountryCode = event => {
    setauthyPhoneCountryCode(event.target.value)
  }
  //Phone number
  const handleauthyPhoneNumber = event => {
    setauthyPhoneNumber(event.target.value)
  }
  const numberValidator = (validateInput, message) => {
    if (!validateInput) {
      props.dispatch(
        notify({
          message: message,
          type: 'error'
        })
      )
      return
    }
  }

  const handleEnable = evt => {
    evt.preventDefault()

    numberValidator(authyPhoneCountryCode, 'Missing country code')
    numberValidator(authyPhoneNumber, 'Missing phone number')

    setSubmitted(true)

    props
      .dispatch(
        update2fa(props.user.ZUID, true, {
          submitted,
          authyPhoneCountryCode,
          authyPhoneNumber
        })
      )
      .then(() => {
        setSubmitted(false)
        props.dispatch(
          notify({ message: 'Two-Factor auth enabled', type: 'success' })
        )
      })
      .catch(err => {
        props.dispatch(
          notify({
            message: 'Two-Factor auth had a problem enabling',
            type: 'error'
          })
        )

        setSubmitted(false)
      })
  }

  const handleDisable = () => {
    props.dispatch(
      zConfirm({
        prompt: 'Are you sure you want to disable two-factor authentication?',
        callback: confirmed => {
          if (confirmed) {
            setSubmitted(true)

            props
              .dispatch(update2fa(props.user.ZUID, false))
              .then(() => {
                props.dispatch(
                  notify({
                    message: 'Two-Factor auth disabled',
                    type: 'success'
                  })
                )

                setSubmitted(false)
              })
              .catch(err => {
                props.dispatch(
                  notify({
                    message: 'Two-Factor auth had a problem disabling',
                    type: 'error'
                  })
                )

                setSubmitted(false)
              })
          }
        }
      })
    )
  }
  return (
    <Card className={styles.TwoFactor}>
      <CardHeader>
        <h1>Two-Factor Authentication (2FA)</h1>
      </CardHeader>
      <CardContent>
        {props.user.authyEnabled ? (
          <>
            <p>
              Two-factor authentication is enabled on your account. Currently
              registered phone number:
            </p>
            <p className={styles.RegisteredNumber}>
              +{props.user.authyPhoneCountryCode}-{props.user.authyPhoneNumber}
            </p>
          </>
        ) : (
          <>
            <p>
              <Url
                className={styles.InfoLink}
                target="_blank"
                href="https://authy.com/what-is-2fa/">
                What is Authy 2 Factor Authentication?
              </Url>
            </p>
            <p>
              Two-factor authentication is not currently enabled for this
              account. Provide your primary phone number for authentication
              below.
            </p>
            <form id="TwoFactor">
              <p className={styles.PhoneNumberLabel}>Phone Number</p>
              <div className={styles.PhoneNumber}>
                <label htmlFor="authyPhoneCountryCode">
                  <Input
                    required
                    type="tel"
                    size="5"
                    placeholder="1"
                    name="authyPhoneCountryCode"
                    value={authyPhoneCountryCode}
                    onChange={handleAuthyPhoneCountryCode}
                  />
                </label>
                <label>
                  <Input
                    required
                    type="tel"
                    placeholder="123-456-7890"
                    name="authyPhoneNumber"
                    value={authyPhoneNumber}
                    onChange={handleauthyPhoneNumber}
                  />
                </label>
              </div>
            </form>
          </>
        )}
      </CardContent>
      <CardFooter>
        {props.user.authyEnabled ? (
          <Button onClick={handleDisable} disabled={submitted}>
            {submitted ? (
              <>
                <i className="fas fa-hourglass" aria-hidden="true" />
                &nbsp;Disabling Authy 2FA
              </>
            ) : (
              <>
                <i className="fas fa-shield-alt" aria-hidden="true" />
                &nbsp;Disable Authy 2FA
              </>
            )}
          </Button>
        ) : (
          <Button form="TwoFactor" onClick={handleEnable} disabled={submitted}>
            {submitted ? (
              <>
                <i className="fas fa-hourglass" aria-hidden="true" />
                &nbsp;Enabling Authy 2FA
              </>
            ) : (
              <>
                <i className="fas fa-shield-alt" aria-hidden="true" />
                &nbsp;Enable Authy 2FA
              </>
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
