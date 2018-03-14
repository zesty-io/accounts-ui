// import React, { Component } from 'react'
// import {connect} from 'react-redux'
// import cx from 'classnames'

import Access from './Access'
import Overview from './Overview'
import Domain from './Domain'
import Stats from './Stats'
import Blueprint from './Blueprint'

// import styles from './styles.less'

// class Website extends Component {
//   render () {
//     return (
//       <article className={styles.website}>
//         <header>
//           <h4>
//             Web Property Overview
//           </h4>
//           <h3 className={styles.name}>
//             {this.props.site.name}
//           </h3>
//         </header>
//         <Overview site={this.props.site} />
//         <Access site={this.props.site} />
//         <Domain site={this.props.site} />
//         <Stats site={this.props.site} />
//         <Blueprint site={this.props.site} />
//         <footer />
//         <DetailsMenu />
//       </article>
//     )
//   }
// }

// export default connect(state => state)(Website)
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import styles from './styles.less'

class WebsiteOverview extends Component {
  constructor(props) {
    super(props)
    this.state = this.props.sites[props.match.params.hash]
  }

  render() {
    return (
      <section className={styles.WebsiteOverviewWrap}>
        <article className={styles.WebsiteOverview}>
          <Link to="/properties/">
            <i className="fa fa-times-circle-o" aria-hidden="true" />
          </Link>
          <header>
            <h1>{this.state.name}</h1>
            <h2>
              {this.state.domain ? (
                this.state.domain
              ) : (
                <Button>
                  <i className={cx('fa fa-cog')} aria-hidden="true" />Setup
                  Domain
                </Button>
              )}
            </h2>
          </header>
          <main>
            <h2>Month Requests</h2>
            <Overview site={this.state} />
            <Stats site={this.state} />


            <h2>Recent Site Actions</h2>
            

            <h2>User Access</h2>
            <Access site={this.state} />
            <h2>Company Access</h2>
            <h2>Blueprint</h2>
            <Blueprint site={this.state} />

          </main>
        </article>
      </section>
    )
  }
}

export default connect((state, ...args) => {
  // console.log('args: ', args)
  // console.log('state: ', state)
  return state
})(WebsiteOverview)
