import config from '../../../../shell/config'
import { request } from '../../../../util/request'

import { blueprints } from './blueprints'
import { sites } from './sites'
import { sitesCompanies } from './sitesCompanies'
import { sitesFiltered } from './sitesFiltered'
import { sitesStats } from './sitesStats'
import { sitesUsers } from './sitesUsers'

export const propertiesReducers = {
  sites,
  sitesCompanies,
  sitesFiltered,
  sitesStats,
  sitesUsers,
  blueprints
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

// export function blueprints(state = {}, action) {
//   switch (action.type) {
//     case 'GET_BLUEPRINTS':
//       return { ...state, ...action.blueprints }
//     default:
//       return state
//   }
// }

// export function filteredSites(state = {}, action) {
//   switch (action.type) {
//     case 'FETCH_SITES_SUCCESS':
//       // return normalizeSites(action.sites)
//       return {}
//
//     case 'FILTER_PROPERTIES':
//       // return action.filteredSites
//       return {}
//
//     default:
//       return state
//   }
// }

// export function sites(state = {}, action) {
//   switch (action.type) {
//     case 'FETCHING_SITES':
//       // TODO show loading state?
//       return state
//
//     case 'FETCH_SITES_SUCCESS':
//       let sites = normalizeSites(action.sites)
//
//       // TODO invite site test
//       sites['0-test-invite'] = {
//         invite: true,
//         ID: 7353800,
//         ZUID: '8-45a294a-1zg0cg',
//         EcoID: 144,
//         PropertyTypeID: 1,
//         RandomHashID: '385b14d47412fe6c30292f53473d62a5',
//         Domain: 'stuartrunyan.com',
//         DomainVerified: true,
//         DevelopmentWebsite: false,
//         AccountName: 'stuartrunyan.com',
//         LegacyDiscountReason: null,
//         PlanID: 14,
//         Addons: null,
//         UpdatedDate: '2017-10-26T20:16:24Z',
//         PaymentMethod: null,
//         Internal: false,
//         Cancelled: false,
//         CancelledReason: null,
//         CancelledCustomerReason: null,
//         CancelledDate: null,
//         Zesty2Account: false,
//         ContainerNameOverride: null,
//         CDNURL: 'https://58h1pb.media.zestyio.com',
//         Plugins: null,
//         EarlyAccessTier: 0,
//         DateActive: null,
//         CreatedDatetime: '2015-04-29T13:08:46Z',
//         CreatedByUserID: 20472736,
//         ThirdPartyOAuthTokens: '{"google":"421"}',
//         Favicon: null,
//         Referrer: 'https://zesty.io/',
//         InitialPlate: 15,
//         RequiresTwoFactor: 0,
//         createdAt: null,
//         updatedAt: '2015-05-01T16:31:41Z',
//         deletedAt: null
//       }
//
//       // return sites
//       return {}
//
//     case 'FETCH_SITES_ERROR':
//       // TODO show global growl of error
//       // leave state as is
//       return state
//
//     case 'CHANGE_DOMAIN':
//       let changeDomain = state.sites.filter(site => site.zuid === action.zuid)
//       return state
//
//     case 'FETCHING_SITE_DETAILS':
//       return state
//
//     case 'FETCH_SITE_DETAILS_SUCCESS':
//       // /{{accounts_api_version}}/instances/{{site_zuid}}/users
//       return {
//         ...state,
//         [action.site.zuid]: { ...state[action.site.zuid], ...action.site }
//       }
//
//     // case 'ADD_PROPERTY':
//     //   let addedSite = {
//     //     sites: [...state.sites].push({
//     //       zuid: 'xxxxx' + (state.sites.length + 1),
//     //       domain: '',
//     //       stage: '',
//     //       name: action.name,
//     //       blueprint: action.blueprint
//     //     })
//     //   }
//     //   return addedSite
//
//     default:
//       return state
//   }
// }

// export const filterProperties = searchString => {
//   return function(dispatch, getState) {
//     let sites = getState().sites
//     if (searchString !== '') {
//       let filteredSites = {}
//       for (const zuid in sites) {
//         if (
//           sites[zuid].ZUID &&
//           sites[zuid].ZUID.toLowerCase().includes(searchString.toLowerCase())
//         ) {
//           filteredSites[zuid] = sites[zuid]
//         }
//         if (
//           sites[zuid].AccountName &&
//           sites[zuid].AccountName.toLowerCase().includes(
//             searchString.toLowerCase()
//           )
//         ) {
//           filteredSites[zuid] = sites[zuid]
//         }
//         if (
//           sites[zuid].RandomHashID &&
//           sites[zuid].RandomHashID.toLowerCase().includes(
//             searchString.toLowerCase()
//           )
//         ) {
//           filteredSites[zuid] = sites[zuid]
//         }
//       }
//       dispatch({
//         meta: { debounce: { time: 250 } },
//         type: 'FILTER_PROPERTIES',
//         filteredSites
//       })
//     } else {
//       dispatch({ type: 'FILTER_PROPERTIES', filteredSites: sites })
//     }
//   }
// }

// export function addProperty(name, blueprint) {
//   return dispatch =>
//     dispatch({
//       type: 'ADD_PROPERTY',
//       name,
//       blueprint
//     })
// }

// export const getBlueprints = () => {
//   return dispatch =>
//     dispatch({
//       type: 'GET_BLUEPRINTS',
//       blueprints: [
//         {
//           name: 'No Blueprint',
//           description:
//             'This blueprint starts with no CSS, HTML, Javascript or content configurations. Good for developers that are building custom websites from scratch.',
//           url:
//             'https://be93523bd41e2e475e74-e4edef19ad51123442eaceed55c78461.ssl.cf2.rackcdn.com/or-zesty-blank.png'
//         },
//         {
//           name: 'Bootstrap 3.3.5',
//           description:
//             'Bootstrap is the most popular HTML, CSS, and JS framework for developing responsive, mobile first projects on the web.',
//           url:
//             'https://be93523bd41e2e475e74-e4edef19ad51123442eaceed55c78461.ssl.cf2.rackcdn.com/or-bootstrap335-thumb.jpg'
//         },
//         {
//           name: 'Skeleton',
//           description:
//             "You should use Skeleton if you're embarking on a smaller project or just don't feel like you need all the utility of larger frameworks. Skeleton only styles a handful of standard HTML elements and includes a grid, but that's often more than enough to get started.",
//           url:
//             'https://be93523bd41e2e475e74-e4edef19ad51123442eaceed55c78461.ssl.cf2.rackcdn.com/or-shield.png'
//         }
//       ]
//     })
// }

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

    request(
      `http://${config.API_ACCOUNTS}:6010/v1/instances/${siteZuid}/users`,
      {
        headers: {
          'User-Zuid': userZuid
        }
      }
    )
      .then(sites => {
        dispatch({
          type: 'FETCH_SITE_USERS_SUCCESS',
          sites
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
    // request(`http://${config.API_ACCOUNTS}:6010/v1/instances/${}/users`, {
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

// export function getSites(userZuid) {
//   return dispatch => {
//     dispatch({
//       type: 'FETCHING_SITES'
//     })
//
//     request(`http://${config.API_ACCOUNTS}:6010/v1/instances`, {
//       headers: {
//         'User-Zuid': userZuid
//       }
//     })
//       .then(sites => {
//         dispatch({
//           type: 'FETCH_SITES_SUCCESS',
//           sites
//         })
//       })
//       .catch(err => {
//         console.error(err)
//         dispatch({
//           type: 'FETCH_SITES_ERROR',
//           err
//         })
//       })
//   }
// }
