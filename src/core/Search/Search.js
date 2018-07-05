import React, { Component } from 'react'
import styles from './Search.less'
import cx from 'classnames'

export default class Search extends Component {
  render() {
    return (
      <form
        className={cx(styles.search, this.props.className)}
        onSubmit={this.handleSubmit}>
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
          value={this.props.searchTerm}
          className={styles.searchField}
          placeholder={this.props.placeholder}
          onFocus={this.props.onFocus}
          onChange={this.handleKeyUp}
        />
      </form>
    )
  }
  handleSubmit = evt => {
    evt.preventDefault()
    // return the target value of the input
    let value = evt.target.term.value
    this.props.onSubmit(value)
  }
  handleKeyUp = evt => {
    evt.preventDefault()
    // return the target value of the input
    let value = evt.target.value
    this.props.onKeyUp(value)
  }
}
