import { request } from '../../../../util/request'
import config from '../../../../shell/config'

const normalizeSites = sites => {
  const zuids = sites.map(site => site.zuid)
  const normalized = zuids.reduce((sites, zuid) => {
    sites[zuid] = {}
    return sites
  }, {})

  sites.forEach(site => {
    normalized[site.zuid] = site
  })

  return normalized
}

export function filteredSites(state = {}, action) {
  switch (action.type) {
    case 'FETCH_SITES_SUCCESS':
      return normalizeSites(action.sites)

    case 'FILTER_PROPERTIES':
      return action.filteredSites

    default:
      return state
  }
}

export function sites(state = {}, action) {
  switch (action.type) {
    case 'FETCHING_SITES':
      // TODO show loading state?
      return state

    case 'FETCH_SITES_SUCCESS':
      return normalizeSites(action.sites)

    case 'FETCH_SITES_ERROR':
      // TODO show global growl of error
      // leave state as is
      return state

    case 'CHANGE_DOMAIN':
      let changeDomain = state.sites.filter(site => site.zuid === action.zuid)
      return state

    case 'FETCHING_SITE_DETAILS':
      return state

    case 'GET_BLUEPRINTS':
      return { ...state, blueprints: action.blueprints }

    case 'FETCH_SITE_DETAILS_SUCCESS':
      return { ...state, site: action.site, detailsSuccess: true }

    case 'ADD_PROPERTY':
      let addedSite = {
        sites: [...state.sites].push({
          zuid: 'xxxxx' + (state.sites.length + 1),
          domain: '',
          stage: '',
          name: action.name,
          blueprint: action.blueprint
        })
      }
      return addedSite

    default:
      return state
  }
}

export const filterProperties = searchString => {
  // return (dispatch) =>
  return function(dispatch, getState) {
    let sites = getState().sites

    if (searchString !== '') {
      let filteredSites = {}
      for (const zuid in sites) {
        if (
          sites[zuid].zuid &&
          sites[zuid].zuid.toLowerCase().includes(searchString.toLowerCase())
        ) {
          filteredSites[zuid] = sites[zuid]
        }
        if (
          sites[zuid].name &&
          sites[zuid].name.toLowerCase().includes(searchString.toLowerCase())
        ) {
          filteredSites[zuid] = sites[zuid]
        }
        if (
          sites[zuid].hash &&
          sites[zuid].hash.toLowerCase().includes(searchString.toLowerCase())
        ) {
          filteredSites[zuid] = sites[zuid]
        }
      }
    dispatch({ meta: {debounce: {time: 500}}, type: 'FILTER_PROPERTIES', filteredSites})
  }else{
    dispatch({type: 'FILTER_PROPERTIES', filteredSites: sites})
  }
  }
}

export function addProperty(name, blueprint) {
  return dispatch =>
    dispatch({
      type: 'ADD_PROPERTY',
      name,
      blueprint
    })
}

export const getBlueprints = () => {
  return dispatch =>
    dispatch({
      type: 'GET_BLUEPRINTS',
      blueprints: [
        {
          name: 'BP1',
          description: 'things that happen',
          url: 'asdgsdagsadg'
        },
        {
          name: 'Good Blueprint',
          description: 'describing the good blueprint',
          url: 'fakeurlforimg.com'
        },
        {
          name: 'not very popular blueprint',
          description:
            'nobody really likes this blueprint, because its ugly and doesnt work well on mobile',
          url: 'www.eeweblueprints.com'
        }
      ]
    })
}

export const changeDomain = (domType, zuid) => {
  return dispatch({
    type: 'CHANGE_DOMAIN',
    domType,
    zuid
  })
}

export const getSiteDetails = id => {
  return dispatch => {
    dispatch({
      type: 'FETCHING_SITE_DETAILS'
    })

    setTimeout(
      () =>
        dispatch({
          type: 'FETCH_SITE_DETAILS_SUCCESS',
          site: {
            zuid: 'xxxxx0',
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

export function getSites(userZuid) {
  return dispatch => {
    dispatch({
      type: 'FETCHING_SITES'
    })

    request(`http://${config.API_ACCOUNTS}:6010/v1/instances`, {
      headers: {
        'User-Zuid': userZuid
      }
    })
      .then(res => res.json())
      .then(sites => {
        console.log('sites', sites)
        dispatch({
          type: 'FETCH_SITES_SUCCESS',
          sites
        })
      })
      .catch(err => {
        console.error(err)
        dispatch({
          type: 'FETCH_SITES_ERROR',
          err
        })
      })
  }
}
