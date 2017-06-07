import React from 'react'
import styles from './styles.less'

export default () => (
  <div className={styles.loader}>
    <span className={styles.bar}></span>
    <span className={styles.bar}></span>
    <span className={styles.bar}></span>
    <span className={styles.bar}></span>
    <span className={styles.bar}></span>
  </div>
)
