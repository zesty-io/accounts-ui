import React from 'react'
import cx from 'classnames'
import styles from './WebsiteCard.less'

import { Card, CardHeader, CardContent, CardFooter } from '@zesty-io/core/Card'
import { AppLink } from '@zesty-io/core/AppLink'
import { ButtonGroup } from '@zesty-io/core/ButtonGroup'
import { Button } from '@zesty-io/core/Button'
import { Url } from '@zesty-io/core/Url'

import InstanceFavorite from '../InstanceFavorite'
export default props => {
  const { site } = props
  return (
    <Card className={styles.WebsiteCard}>
      <CardHeader className={styles.CardHeader}>
        <h1 className={styles.subheadline}>{site.name}</h1>
        <InstanceFavorite
          className={styles.favorite}
          favorite={site.favorite}
          ZUID={site.ZUID}
        />
      </CardHeader>
      {site.domain ? (
        site.screenshotURL ? (
          <CardContent className={cx(styles.CardContent, styles.cover)}>
            <img src={site.screenshotURL} loading="lazy" width="100%" />
          </CardContent>
        ) : (
          <CardContent className={cx(styles.CardContent, styles.cover)} />
        )
      ) : (
        <CardContent className={cx(styles.CardContent, styles.Offline)}>
          <i
            className={cx(styles.icon, 'fa fa-picture-o')}
            aria-hidden="true"
          />

          <AppLink to={`/instances/${site.ZUID}/launch`}>
            <Button kind="secondary">
              <i className="fa fa-rocket" aria-hidden="true" />
              Publish Instance
            </Button>
          </AppLink>
        </CardContent>
      )}

      <CardFooter className={styles.CardFooter}>
        <ButtonGroup className={styles.controls}>
          <AppLink to={`/instances/${site.ZUID}`}>
            <i
              className={'fa fa-cog'}
              aria-hidden="true"
              title="Edit instance settings"
            />
          </AppLink>

          <Url
            target="_blank"
            title={`Preview instance: ${site.name}`}
            href={`${CONFIG.PREVIEW_URL_PROTOCOL}${site.randomHashID}${CONFIG.PREVIEW_URL}`}>
            <i className={'fa fa-eye'} aria-hidden="true" />
          </Url>

          {site.domain ? (
            <Url
              href={`http://${site.domain}`}
              target="_blank"
              title="View live domain">
              <i className="fa fa-globe" aria-hidden="true" />
            </Url>
          ) : (
            <span />
          )}
          {/* only display link to manager if a blueprint has been selected */}
          {site.blueprintID !== null ? (
            <Url
              className={styles.manager}
              target="_blank"
              href={`${CONFIG.MANAGER_URL_PROTOCOL}${site.randomHashID}${CONFIG.MANAGER_URL}`}>
              <i className="fas fa-edit"></i>
              &nbsp;Edit Content
            </Url>
          ) : (
            <AppLink
              to={`/instances/${site.ZUID}/blueprint`}
              className={styles.selectBlueprint}>
              <i className="fas fa-file-code" aria-hidden="true" />
              &nbsp;Select Blueprint
            </AppLink>
          )}
        </ButtonGroup>
      </CardFooter>
    </Card>
  )
}
