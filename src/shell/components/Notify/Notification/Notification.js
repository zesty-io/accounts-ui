import { PureComponent } from "react";

import { remove } from "../../../store/notifications";

import cx from 'classnames'
import styles from './Notification.less'

export default class Notification extends PureComponent {
  componentDidMount() {
    const timeout = this.props.timeout || 3000
    setTimeout(() => {
      this.props.dispatch(remove(this.props.epoch));
    }, timeout);
  }
  onClose = () => {};
  render() {
    return (
      <article key={this.props.epoch} className={cx(styles[this.props.type], styles.Notification)}>
        <p>{this.props.message}</p>
      </article>
    );
  }
}
