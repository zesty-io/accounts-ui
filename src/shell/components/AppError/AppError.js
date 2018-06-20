import { Component } from 'React'
import styles from './AppError.less'
import bugsnag from 'bugsnag-js'
import createPlugin from 'bugsnag-react'

const bugsnagClient = bugsnag('7e50d87ea61932f9e3141420402f4eed')
const ErrorBoundary = bugsnagClient.use(createPlugin(React))
export default class AppError extends Component {
  constructor(props) {
    super(props)
    this.state = {
      err: null,
      hasError: false
    }
  }

  componentDidCatch(error, info) {
    console.log('Caught Error', error, info)

    // Display fallback UI
    this.setState({
      err: error,
      hasError: true
    })
    // You can also log the error to an error reporting service
    console.table(error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorBoundary>
          <section className={styles.AppCrash}>
            <h1>
              <i className="fa fa-bug" aria-hidden="true" />&nbsp;We apologize
              but something went wrong
            </h1>
            <h3>
              Try reloading the application (CMD + R).&nbsp;
              <Url
                href={`mailto:support@zesty.io?subject=Accounts App Crash&body=REPLACE WITH EXTRA INFORMATION ---- ${
                  this.state.err
                }`}
                target="_blank">
                Report to support@zesty.io
              </Url>
            </h3>
          </section>
        </ErrorBoundary>
      )
    } else {
      return this.props.children
    }
  }
}
