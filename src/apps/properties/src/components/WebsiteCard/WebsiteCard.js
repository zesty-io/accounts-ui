import React from 'react'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import styles from './WebsiteCard.less'

import InstanceFavorite from '../InstanceFavorite'

export default props => {
  const { site } = props
  return (
    <Card className={styles.WebsiteCard}>
      <CardHeader className={styles.CardHeader}>
        <h1>{site.name}</h1>
        <InstanceFavorite
          className={styles.favorite}
          favorite={site.favorite}
          ZUID={site.ZUID}
        />
      </CardHeader>
      {site.domain ? (
        site.screenshotURL ? (
          <CardContent
            className={cx(styles.CardContent, styles.cover)}
            style={{ backgroundImage: `url(${site.screenshotURL})` }}
          />
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
            <Button type="save">
              <i className="fa fa-rocket" aria-hidden="true" />Launch Instance
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
            href={`${CONFIG.PREVIEW_URL_PROTOCOL}${site.randomHashID}${
              CONFIG.PREVIEW_URL
            }`}
          >
            <i className={'fa fa-eye'} aria-hidden="true" />
          </Url>

          {site.domain ? (
            <Url
              href={`http://${site.domain}`}
              target="_blank"
              title="View live domain"
            >
              <i className="fa fa-globe" aria-hidden="true" />
            </Url>
          ) : (
            <span />
          )}

          <Url
            className={styles.manager}
            target="_blank"
            title="Load instance manager"
            href={`${CONFIG.MANAGER_URL_PROTOCOL}${site.randomHashID}${
              CONFIG.MANAGER_URL
            }`}
          >
            Open Manager&nbsp;<i
              className="fa fa-external-link-square"
              aria-hidden="true"
            />
          </Url>
        </ButtonGroup>
      </CardFooter>
    </Card>
  )
}
