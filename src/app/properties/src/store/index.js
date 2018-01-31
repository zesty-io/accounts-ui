export const FETCHING_SITES = 'FETCHING_SITES'
export const FETCH_SITES_SUCCESS = 'FETCH_SITES_SUCCESS'
export const FETCH_SITES_ERROR = 'FETCH_SITES_ERROR'

export function getSites(id) {
  return (dispatch) => {
    dispatch({
      type: FETCHING_SITES
    })

    dispatch({
      type: FETCH_SITES_SUCCESS,
      sites: [{
        zuid: 'xxxxx0',
        name: 'Hofbrauhaus Brand Epicenter / America Corp',
        domain: '',
        stage: 'http://2xzzl8fb.sites.zesty.localdev:3001/',

      }, {
        zuid: 'xxxxx1',
        name: 'Hofbrauhaus America Corporate',
        domain: 'https://www.hofbrauhaus.us',
        stage: 'http://2xzzl8fb.sites.zesty.localdev:3001/',

      }, {
        zuid: 'xxxxx2',
        name: 'Hofbrauhaus FR - Las Vegas',
        domain: 'https://www.hofbrauhauslasvegas.com',
        stage: 'http://2xzzl8fb.sites.zesty.localdev:3001/',
      }, {
        zuid: 'xxxxx3',
        name: 'Hofbrauhaus FR - Chicago',
        domain: 'https://www.hofbrauhauschicago.com',
        stage: 'http://2xzzl8fb.sites.zesty.localdev:3001/',
      }]
    })

    // TODO implement sites endpoint
    // fetch(`http://localhost:9001/sites/${id}`)
    //   .then(res => res.json())
    //   .then(user => {
    //     console.log('user', user)
    //     dispatch({
    //       type: FETCH_SITES_SUCCESS,
    //       id,
    //       user
    //     })
    //   })
    //   .catch(err => {
    //     console.error(err)
    //     dispatch({
    //       type: FETCH_SITES_ERROR,
    //       id,
    //       err
    //     })
    //   })

  }
}

export function sites(state = {}, action) {
  switch(action.type) {
    // case FETCHING_SITES:
    //   // TODO show loading state?
    //   return state

    case FETCH_SITES_SUCCESS:
      const zuids = action.sites.map(site => site.zuid)
      const sites = zuids.reduce((sites, zuid) => sites[zuid] = {}, {})

      action.sites.forEach(site => sites[site.zuid] = site)

      return sites

    // case FETCH_SITES_ERROR:
    //   // TODO handle failure

    default:
      return state
  }
}
