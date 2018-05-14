import cx from 'classnames'
import styles from './Card.less'

export function Card(props) {
  return (
    <article className={cx(styles.Card, props.className)}>
      {props.children}
    </article>
  )
}

export function CardHeader(props) {
  return (
    <header className={cx(styles.CardHeader, props.className)}>
      {props.children}
    </header>
  )
}

export function CardContent(props) {
  return (
    <main className={cx(styles.CardContent, props.className)}>
      {props.children}
    </main>
  )
}

export function CardFooter(props) {
  return (
    <footer className={cx(styles.CardFooter, props.className)}>
      {props.children}
    </footer>
  )
}
