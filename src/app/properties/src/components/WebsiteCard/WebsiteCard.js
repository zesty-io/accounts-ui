import React, { Component } from 'react'
import {connect} from 'react-redux'
import cx from 'classnames'
import styles from './WebsiteCard.less'

class WebsiteCard extends Component {
  render() {
    console.log('site: ', this.props)
    return (
      <article className={styles.WebsiteCard}>
        <header>
          <h1 className={styles.name}>
            {this.props.site.name}
          </h1>
          <h2 className={styles.domain}>
            {this.props.site.domain
              ? <a href={this.props.site.domain} target="_blank">{this.props.site.domain}</a>
              : <Button className={styles.setup}><i className={cx(styles.icon, "fa fa-cog")} aria-hidden="true"></i>Setup Domain</Button>}
          </h2>

          {/*<ButtonGroup>
                      <Link>
                        <i className="fa fa-external-link" aria-hidden="true"></i>View Stage
                      </Link>
                      <Link>
                        <i className="fa fa-external-link" aria-hidden="true"></i>View Live
                      </Link>
                      <Button>
                        Site Manager
                       </Button>
                    </ButtonGroup>*/}
        </header>
        <main>
          {/*<div>
                               <ButtonGroup>
                                 <Button>
                                   Open Site Manager
                                 </Button>

                               </ButtonGroup>
                              </div>*/}
        </main>
        <footer></footer>
      </article>
    )
  }
}

export default connect(state => state)(WebsiteCard)
