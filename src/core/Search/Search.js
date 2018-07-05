import React, { Component } from 'react'
import styles from './Search.less'
import cx from 'classnames'

export default class Search extends Component {
  state = {
    searchTerm: ''
  }
  componentDidMount() {
    // lets the user override the initial value in the search box
    if (this.props.override) {
      this.setState({ searchTerm: this.props.override })
    }
  }
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
          value={this.state.searchTerm}
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
    this.props.onSubmit(this.state.searchTerm)
  }
  handleKeyUp = evt => {
    evt.preventDefault()
    // return the target value of the input
    this.setState({ searchTerm: evt.target.value }, () =>
      this.props.onKeyUp(this.state.searchTerm)
    )
  }
}
