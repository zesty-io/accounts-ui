import React from 'react'
import styles from './error.less'

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true })
    // You can also log the error to an error reporting service
    console.error(error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.Error}>
          <h1>We apologize but it appears we ran into an error.</h1>
        </div>
      )
    }
    return this.props.children
  }
}
