import React from 'react'
import styles from './Search.less'
import cx from 'classnames'

export default function Search(props) {
  function handleFilter(evt) {
    evt.preventDefault()
    // returns the target value of the input
    evt.target.value = evt.target.term.value
    props.onClick(evt)
  }
  return (
    <form
      className={cx(styles.search, props.className)}
      onSubmit={handleFilter}>
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
        onKeyUp={props.onKeyUp}
      />
    </form>
  )
}
