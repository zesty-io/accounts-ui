import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import debounce from 'lodash.debounce'

import { sortSites } from '../../../../store/sites'
import { saveProfile } from '../../../../../../../shell/store/user'
import { fetchEcosystems } from '../../../../../../../shell/store/ecosystems'

import { Search } from '@zesty-io/core/Search'
import { DropDownFieldType } from '@zesty-io/core/DropDownFieldType'
import { ToggleButton } from '@zesty-io/core/ToggleButton'
import { Button } from '@zesty-io/core/Button'

import styles from './PropertiesHeader.less'
export default connect(state => state)(
  class PropertiesHeader extends Component {
    constructor(props) {
      super(props)
      this.state = {
        eco: props.settings && props.settings.eco,
        sort: 0
      }
    }

    componentDidMount() {
      this.props.dispatch(fetchEcosystems())
    }

    onSearch = debounce((name, term) => {
      this.props.dispatch({
        type: 'SETTING_FILTER',
        filter: term
      })
    }, 250)

    filterByEco = (name, value) => {
      let eco = value && value !== '0' ? value : false

      this.setState({ eco })
      this.props.dispatch({
        type: 'SETTING_ECO',
        eco
      })
    }

    sort = by => {
      this.props.dispatch(sortSites(by))
    }

    render() {
      const ecosystems = this.props.ecosystems.map(eco => {
        return {
          value: eco.ZUID,
          text: eco.name
        }
      })

      return (
        <header className={styles.PropertiesHeader}>
          <div className={styles.Actions}>
            {ecosystems.length ? (
              <DropDownFieldType
                className={styles.Ecosystem}
                name="ecoFilter"
                onChange={this.filterByEco}
                selection={ecosystems.find(eco => eco.ZUID == this.state.eco)}
                options={ecosystems}
              />
            ) : null}

            <Search
              className={styles.Search}
              override={this.props.settings && this.props.settings.filter}
              placeholder="Search by instance name or domain"
              onSubmit={this.onSearch}
              onChange={this.onSearch}
            />

            <Link className={styles.CreateInstance} to="/instances/create">
              <Button kind="save">
                <i className="fa fa-plus" aria-hidden="true" />
                Create Instance
              </Button>
            </Link>

            <ToggleButton
              className={styles.Sort}
              title="Switch instance sorting between alphabetical and created date"
              value={this.state.sort}
              offValue={<i className={`fas fa-sort-alpha-down`} />}
              onValue={<i className={`fas fa-calendar`} />}
              onChange={(name, value) => {
                this.setState({
                  sort: value
                })
                // if value 0 sort by name else if 1 sort by createdAt
                this.sort(value ? 'createdAt' : 'name')
              }}
            />

            <ToggleButton
              className={styles.Layout}
              title="Switch instance view between grid and list"
              value={this.props.layout === 'grid' ? 0 : 1}
              offValue={<i className={`fa fa-th`} />}
              onValue={<i className={`fa fa-th-list`} />}
              onChange={(name, value) => {
                this.props.dispatch({
                  type: 'INSTANCE_LAYOUT',
                  layout: value ? 'list' : 'grid'
                })
                this.props.dispatch(saveProfile())
              }}
            />
          </div>
        </header>
      )
    }
  }
)
