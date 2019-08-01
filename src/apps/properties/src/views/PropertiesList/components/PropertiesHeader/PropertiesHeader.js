import React, { Component } from 'react'
import { connect } from 'react-redux'

import debounce from 'lodash.debounce'

import { sortSites } from '../../../../store/sites'
import { saveProfile } from '../../../../../../../shell/store/user'

import { Search } from '@zesty-io/core/Search'
import { DropDownFieldType } from '@zesty-io/core/DropDownFieldType'
import { ButtonGroup } from '@zesty-io/core/ButtonGroup'
import { Button } from '@zesty-io/core/Button'

import styles from './PropertiesHeader.less'

export default connect(state => state)(
  class PropertiesHeader extends Component {
    constructor(props) {
      super(props)
      this.state = {
        eco: props.settings && props.settings.eco,
        sort: 'name'
      }
    }

    onSearch = debounce((name, term) => {
      this.props.dispatch({
        type: 'SETTING_FILTER',
        filter: term
      })
    }, 250)

    filterByEco = (name, value) => {
      if (value) {
        this.setState({ eco: value })
        this.props.dispatch({
          type: 'SETTING_ECO',
          eco: Number(value)
        })
      } else {
        this.setState({ eco: false })
        this.props.dispatch({
          type: 'SETTING_ECO',
          eco: ''
        })
      }
    }

    sort = by => {
      this.props.dispatch(sortSites(by))
    }

    render() {
      const ecosystems = this.props.ecosystems.map(eco => {
        return {
          value: eco.id,
          text: eco.name
        }
      })

      return (
        <header className={styles.PropertiesHeader}>
          <div className={styles.Actions}>
            {ecosystems.length && (
              <DropDownFieldType
                className={styles.Ecosystem}
                name="ecoFilter"
                onChange={this.filterByEco}
                selection={ecosystems.find(eco => eco.id == this.state.eco)}
                options={ecosystems}
              />
            )}

            <Search
              className={styles.Search}
              override={this.props.settings && this.props.settings.filter}
              placeholder="Search by instance name or domain"
              onSubmit={this.onSearch}
              onChange={this.onSearch}
            />

            <ButtonGroup className={styles.Sort}>
              <Button
                title="Sort alphabetically by name"
                disabled={this.state.sort === 'name'}
                onClick={() => {
                  this.setState({ sort: 'name' })
                  return this.sort('name')
                }}>
                <i className={`fas fa-sort-alpha-down`} />
              </Button>
              <Button
                title="Sort by created date"
                disabled={this.state.sort === 'date'}
                onClick={() => {
                  this.setState({ sort: 'date' })
                  return this.sort('createdAt')
                }}>
                <i className={`fas fa-calendar`} />
              </Button>
            </ButtonGroup>

            <ButtonGroup className={styles.Layout}>
              <Button
                title="View instances as a grid"
                disabled={this.props.layout === 'grid'}
                onClick={() => {
                  this.props.dispatch({
                    type: 'INSTANCE_LAYOUT',
                    layout: 'grid'
                  })
                  this.props.dispatch(saveProfile())
                }}>
                <i className={`fa fa-th`} />
              </Button>
              <Button
                title="View instances as a list"
                disabled={this.props.layout === 'list'}
                onClick={() => {
                  this.props.dispatch({
                    type: 'INSTANCE_LAYOUT',
                    layout: 'list'
                  })
                  this.props.dispatch(saveProfile())
                }}>
                <i className={`fa fa-th-list`} />
              </Button>
            </ButtonGroup>
          </div>
        </header>
      )
    }
  }
)
