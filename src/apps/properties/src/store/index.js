import config from '../../../../shell/config'
import { request } from '../../../../util/request'

import { blueprints } from './blueprints'
import { sites } from './sites'
import { sitesCompanies } from './sitesCompanies'
import { sitesFiltered } from './sitesFiltered'
import { sitesStats } from './sitesStats'
import { sitesUsers } from './sitesUsers'
import { invite } from './invite'
import { createSite } from './createSite'

export const propertiesReducers = {
  sites,
  sitesCompanies,
  sitesFiltered,
  sitesStats,
  sitesUsers,
  invite,
  blueprints,
  createSite
}

export const normalizeSites = sites => {
  const zuids = sites.map(site => site.ZUID)
  const normalized = zuids.reduce((sites, zuid) => {
    sites[zuid] = {}
    return sites
  }, {})

  sites.forEach(site => {
    normalized[site.ZUID] = site
  })

  return normalized
}

export const changeDomain = (domType, zuid) => {
  return dispatch({
    type: 'CHANGE_DOMAIN',
    domType,
    zuid
  })
}


export const getUsersForSite = (id, siteZuid) => {
  return dispatch => {
    dispatch({
      type: 'FETCHING_SITE_USERS'
    })

    request(`${config.API_ACCOUNTS}/instances/${siteZuid}/users`)
      .then(sites => {
        dispatch({
          type: 'FETCH_SITE_USERS_SUCCESS',
          sites: sites.data
        })
      })
      .catch(err => {
        console.error(err)
        dispatch({
          type: 'FETCH_SITE_USERS_ERROR',
          err
        })
      })
  }
}

export const getSiteDetails = id => {
  return dispatch => {
    dispatch({
      type: 'FETCHING_SITE_DETAILS'
    })
    // request(`${config.API_ACCOUNTS}/instances/${}/users`, {
    //   headers: {
    //     'User-Zuid': userZuid
    //   }
    // })
    setTimeout(
      () =>
        dispatch({
          type: 'FETCH_SITE_DETAILS_SUCCESS',
          site: {
            zuid: '8-5fbd084-cf8d72',
            name: 'Hofbrauhaus Brand Epicenter / America Corp',
            domain: '',
            domainSelect: 'no',
            dns: '',
            stage: 'http://2xzzl8fb.sites.zesty.localdev:3001/',
            blueprintImgUrl:
              'https://raw.githubusercontent.com/zesty-io/plate-material-ui/master/shield.png',
            blueprint: 'Material UI Blueprint',
            blueprintDetails:
              'these are details about the selected blueprint, it is probably a good blueprint that youll really like',
            metadata: {
              plan: 'Site in Development',
              contributors: 3,
              createdOn: '12-3-18',
              createdBy: 'Grant',
              status: 'In Development'
            },
            requests: {},
            stats: {
              allTime: {
                dev: 3,
                manager: 32
              },
              thisMonth: {
                dev: 1,
                manager: 10
              }
            },
            users: [
              {
                name: 'Garrett D',
                email: 'email@email.com',
                role: 'owner'
              },
              {
                name: 'Scarlet G',
                email: 'email@domain.com',
                role: 'contributor'
              }
            ]
          }
        }),
      500
    )
  }
}
