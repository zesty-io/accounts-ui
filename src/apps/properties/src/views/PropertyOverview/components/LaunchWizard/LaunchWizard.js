import React, { useState, useEffect } from 'react'

import { notify } from '../../../../../../../shell/store/notifications'
import { checkDNS } from '../../../../store/sites'

import { Card, CardHeader, CardContent, CardFooter } from '@zesty-io/core/Card'
import { Button } from '@zesty-io/core/Button'
import { Url } from '@zesty-io/core/Url'

import Domain from '../Domain'

import styles from './LaunchWizard.less'
export default function LaunchWizard(props) {
  const [verified, setVerified] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleCheckDNS = () => {
    if (!props.site.domain) {
      props.dispatch(
        notify({
          type: 'error',
          message: 'A domain must be set in order to verify DNS'
        })
      )
      return
    }

    setLoading(true)

    props
      .dispatch(
        checkDNS({
          aRecord: CONFIG.A_RECORD,
          cName: CONFIG.C_NAME,
          domain: props.site.domain
        })
      )
      .then(data => {
        setLoading(false)

        if (data.verified) {
          setVerified(true)
          props.dispatch(
            notify({
              type: 'success',
              message: 'Your DNS successfully verified'
            })
          )
        } else {
          setVerified(false)
          props.dispatch(
            notify({
              type: 'error',
              message: 'Your DNS could not be verified'
            })
          )
        }
      })
      .catch(err => {
        setVerified(false)
        setLoading(false)

        props.dispatch(
          notify({
            type: 'error',
            message: err.error
          })
        )
      })
  }

  return (
    <Card className={styles.LaunchWizard}>
      <CardHeader className={styles.CardHeader}>
        <h2>
          <i className="fa fa-rocket" aria-hidden="true" />
          &nbsp;Launch Your Instance!
        </h2>
      </CardHeader>
      <CardContent>
        <p className={styles.instructions}>
          The process of launching your website is done by adding a
          pre-purchased domain to your instance. Allowing your vistors access to
          any pages or API endpoints you have created. View our{' '}
          <Url
            href="https://zesty.org/services/web-engine/guides/how-to-launch-an-instance#setting-a-custom-domain-in-zesty-io-accounts"
            target="_blank">
            documentation
          </Url>{' '}
          for more detail.
        </p>
        <ol>
          <li>
            <h4>Set a domain for this instance</h4>
            {props.isAdmin ? (
              <Domain
                siteZUID={props.site.ZUID}
                site={props.site}
                domain={props.site.domain}
                dispatch={props.dispatch}
              />
            ) : (
              <p className={styles.domain}>
                <em>
                  <i
                    className="fa fa-exclamation-triangle"
                    aria-hidden="true"
                  />
                  &nbsp; You must be a instance owner or admin to set the domain
                </em>
              </p>
            )}
          </li>

          <li className={styles.dns}>
            Add a CNAME record to your{' '}
            <abbr title="Domain Name Servers">DNS</abbr> provider
            <div className={styles.settings}>
              <p>
                <code>{CONFIG.C_NAME}</code>
              </p>
              {/* <p>
                A Record: <code>{CONFIG.A_RECORD}</code>
              </p> */}
            </div>
          </li>
          <li className={styles.confirm}>
            Confirm your instance is live
            <Button type="save" onClick={handleCheckDNS} disabled={loading}>
              {verified ? (
                <i className="fa fa-check" aria-hidden="true" />
              ) : (
                <i className="fa fa-question" aria-hidden="true" />
              )}
              Check DNS
            </Button>
          </li>
        </ol>
      </CardContent>
    </Card>
  )
}
