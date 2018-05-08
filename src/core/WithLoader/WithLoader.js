import React from 'react'
import styles from './WithLoader.less'

export default function WithLoader(props) {
  return props.condition ? (
    props.children
  ) : (
    <section className={styles.Loading}>
      <h3>{props.message}</h3>
      <Loader />
    </section>
  )
}
