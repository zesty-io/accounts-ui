import React from 'react'
import styles from './Search.less'
import cx from 'classnames'

export default class Search extends React.Component {
  state = {
    term: ''
  }
  render() {
    return (
      <div className={cx(styles.search, this.props.className)}>
        <Button className={styles.searchBtn} onClick={this.handleFilter}>
          <i
            className={cx(styles.searchIcon, 'fa fa-search')}
            aria-hidden="true"
          />
        </Button>
        <input
          type="text"
          className={styles.searchField}
          placeholder={this.props.placeholder}
          value={this.state.term}
          onChange={evt => this.setState({ term: evt.target.value })}
          onFocus={this.props.onFocus}
          onKeyUp={this.props.onKeyUp}
        />
      </div>
    )
  }
  handleFilter = evt => {
    // Prevent button click from triggering
    // a form submission if this exists inside
    // of a form element parent
    evt.preventDefault()
    if (!evt.target.value) {
      evt.target.value = this.state.term
    }
    this.props.onClick(evt)
  }
}
