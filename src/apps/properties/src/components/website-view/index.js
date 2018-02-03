import React, { Component } from 'react'
import {connect} from 'react-redux'
import cx from 'classnames'
import styles from './styles.less'

class Website extends Component {
  render () {
    return (
      <article className={styles.website}>
        <header>
          <h1 className={styles.name}>
            {this.props.site.name}
          </h1>
          <h2 className={styles.domain}>
            {this.props.site.domain
              ? this.props.site.domain
              : <Button className={styles.setup}><i className={cx(styles.icon, 'fa fa-cog')} aria-hidden='true' />Setup Domain</Button>}
          </h2>
          {/* <ButtonGroup>
                      <Link>
                        <i className="fa fa-external-link" aria-hidden="true"></i>View Stage
                      </Link>
                      <Link>
                        <i className="fa fa-external-link" aria-hidden="true"></i>View Live
                      </Link>

                    </ButtonGroup> */}
        </header>
        <main>
          {/* <div>
                     <ButtonGroup>
                       <Button>
                         Open Site Manager
                       </Button>

                     </ButtonGroup>
                    </div> */}
        </main>
        <footer />
      </article>
    )
  }
}

const WebsiteView = connect(state => state)(Website)

export default WebsiteView
