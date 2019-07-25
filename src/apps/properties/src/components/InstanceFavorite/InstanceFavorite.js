import React from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'
import styles from './InstanceFavorite.less'

import { favoriteSite, saveProfile } from '../../../../../shell/store/user'

export default connect()(function InstanceFavorite(props) {
  const action = props.favorite ? 'REMOVE' : 'ADD'
  const icon = props.favorite ? 'fas fa-star' : 'far fa-star'
  const status = props.favorite ? null : styles.NonFavorite

  return (
    <i
      title={props.title}
      className={cx(icon, styles.Favorite, status, props.className)}
      aria-hidden="true"
      onClick={() => {
        props.dispatch(favoriteSite(props.ZUID, action))
        props.dispatch(saveProfile()).catch(err => {
          this.props.dispatch(
            notify({
              message: `Error saving user profile data`,
              type: 'error'
            })
          )
        })
      }}
    />
  )
})
