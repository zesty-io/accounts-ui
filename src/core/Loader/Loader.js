import React from 'react'
import styles from './Loader.less'

export default () => (
  <div className={styles.loader}>
    <span className={styles.bar} />
    <span className={styles.bar} />
    <span className={styles.bar} />
    <span className={styles.bar} />
    <span className={styles.bar} />
  </div>
)
