import React from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'
import styles from './InstanceFavorite.less'

import { favoriteSite, saveProfile } from '../../../../../shell/store/user'

export default connect()(function InstanceFavorite(props) {
  const action = props.favorite ? 'REMOVE' : 'ADD'
  const icon = props.favorite ? 'fa-star' : 'fa-star-o'

  return (
    <i
      title={props.title}
      className={cx('fa', icon, styles.Favorite, props.className)}
      aria-hidden="true"
      onClick={() => {
        props.dispatch(favoriteSite(props.ZUID, action))
        props.dispatch(saveProfile())
      }}
    />
  )
})
