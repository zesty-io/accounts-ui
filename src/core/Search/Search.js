import React from 'react'
import styles from './Search.less'
import cx from 'classnames'

export default function Search(props) {
  function handleSubmit(evt) {
    evt.preventDefault()
    // return the target value of the input
    let value = evt.target.term.value
    props.onSubmit(value)
  }
  function handleKeyUp(evt) {
    evt.preventDefault()
    // return the target value of the input
    let value = evt.target.value
    props.onKeyUp(value)
  }
  return (
    <form
      className={cx(styles.search, props.className)}
      onSubmit={handleSubmit}>
      <Button className={styles.searchBtn} type="submit">
        <i
          className={cx(styles.searchIcon, 'fa fa-search')}
          aria-hidden="true"
        />
      </Button>
      <input
        type="text"
        name="term"
        autoComplete="off"
        className={styles.searchField}
        placeholder={props.placeholder}
        onFocus={props.onFocus}
        onKeyUp={handleKeyUp}
      />
    </form>
  )
}
