import React from 'react'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import styles from './WebsiteCard.less'

// import { Line } from 'react-chartjs-2'

const WebsiteCard = props => {
  const { site } = props
  return (
    <Card className={styles.WebsiteCard}>
      <CardHeader className={styles.CardHeader}>
        <h1>{site.name}</h1>
      </CardHeader>
      {site.screenshotUrl ? (
        <CardContent
          className={cx(styles.CardContent, styles.cover)}
          style={{ backgroundImage: `url(${site.screenshotUrl})` }}
        />
      ) : (
        <CardContent className={cx(styles.CardContent, styles.Offline)}>
          <i
            className={cx(styles.icon, 'fa fa-picture-o')}
            aria-hidden="true"
          />
          <p>
            <i className="fa fa-exclamation-triangle" aria-hidden="true" />&nbsp;
            Instance Offline
          </p>
        </CardContent>
      )}
      <CardFooter className={styles.CardFooter}>
        <ButtonGroup className={styles.controls}>
          <Url
            className={styles.manager}
            target="_blank"
            title="Load instance manager"
            href={`${CONFIG.MANAGER_URL_PROTOCOL}${site.randomHashID}${
              CONFIG.MANAGER_URL
            }`}
          >
            <i className="fa fa-external-link" aria-hidden="true" />&nbsp;
            Manager App
          </Url>

          {site.domain ? (
            <Url
              href={`//${site.domain}`}
              target="_blank"
              title="View live domain"
            >
              <i className="fa fa-globe" aria-hidden="true" />
            </Url>
          ) : (
            <AppLink
              to={`/instances/${site.ZUID}`}
              title="Setup instance domain"
            >
              <i className="fa fa-plus" aria-hidden="true" />
            </AppLink>
          )}

          <Url
            target="_blank"
            title={`Preview instance: ${site.name}`}
            href={`${CONFIG.PREVIEW_URL_PROTOCOL}${site.randomHashID}${
              CONFIG.PREVIEW_URL
            }`}
          >
            <i className={'fa fa-eye'} aria-hidden="true" />
          </Url>
          <AppLink to={`/instances/${site.ZUID}`}>
            <i
              className={'fa fa-cog'}
              aria-hidden="true"
              title="Edit instance settings"
            />
          </AppLink>
        </ButtonGroup>
      </CardFooter>
    </Card>
  )
}

export default WebsiteCard
