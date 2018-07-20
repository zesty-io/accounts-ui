import { PureComponent } from 'react'

import { remove } from '../../../store/notifications'

import cx from 'classnames'
import styles from './Notification.less'

export default class Notification extends PureComponent {
  componentDidMount() {
    const timeout = this.props.timeout || 5000
    // NOTE is there a memory leak with not capturing
    // this timeout reference and cleaning up on unmount?
    setTimeout(() => {
      this.props.dispatch(remove(this.props.epoch))
    }, timeout)
  }
  render() {
    return (
      <article
        key={this.props.epoch}
        id="notificationMessage"
        className={cx(
          styles[this.props.type],
          styles.Notification,
          styles.Animate
        )}>
        <span className={styles.Content}>
          <p className={styles.Message}>{this.props.message}</p>
          <i
            className={`fa fa-times circle ${styles.Close}`}
            onClick={() => this.props.dispatch(remove(this.props.epoch))}
          />
        </span>
      </article>
    )
  }
}
