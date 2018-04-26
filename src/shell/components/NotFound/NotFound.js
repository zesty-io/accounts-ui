import React from 'react'
import styles from './NotFound.less'

const NotFound = () => {
  // window.setTimeout(() => (window.location = "/login"), 3000);
  return (
    <div className={styles.notFound}>
      <h1>This is not the page you are looking for</h1>
      {/* <h2>taking you to a safe place</h2> */}
    </div>
  )
}

export default NotFound
