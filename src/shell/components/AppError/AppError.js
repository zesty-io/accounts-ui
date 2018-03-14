import { Component } from 'React'
import styles from './AppError.less'

export default class AppError extends Component {
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
        <section className={styles.AppCrash}>
          <h1>
            <i className="fa fa-bug" aria-hidden="true" />&nbsp;We apologize but
            something went wrong
          </h1>
        </section>
      )
    } else {
      return this.props.children
    }
  }
}
