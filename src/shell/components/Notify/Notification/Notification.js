import { PureComponent } from 'react'

import { remove } from '../../../store/notifications'

import cx from 'classnames'
import styles from './Notification.less'

export default class Notification extends PureComponent {
  componentDidMount() {
    const timeout = this.props.timeout || 5000
    setTimeout(() => {
      this.props.dispatch(remove(this.props.epoch))
    }, timeout)
  }
  render() {
    // HTML takes priority over plain mesage rendering
    if (this.props.HTML) {
      // TODO: real sanitizing or remove html rendering
      if (this.props.HTML.toLowerCase().includes('<script>')) {
        return (
          <p className={(styles.Notification, styles.Animate)}>
            nope! didnt say the magic word
          </p>
        )
      }
      return (
        <article
          onClick={() => this.props.dispatch(remove(this.props.epoch))}
          key={this.props.epoch}
          className={cx(
            styles[this.props.type],
            styles.Notification,
            styles.Animate
          )}
        >
          <p dangerouslySetInnerHTML={{ __html: this.props.HTML }} />
        </article>
      )
    }
    return (
      <article
        onClick={() => this.props.dispatch(remove(this.props.epoch))}
        key={this.props.epoch}
        className={cx(
          styles[this.props.type],
          styles.Notification,
          styles.Animate
        )}
      >
        <p>{this.props.message}</p>
      </article>
    )
  }
}
