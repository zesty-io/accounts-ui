export function sites (state = {}, action) {
  switch (action.type) {
    // case 'FETCHING_SITES':
    //   // TODO show loading state?
    //   return state

    case 'FETCH_SITES_SUCCESS':
      const zuids = action.sites.map(site => site.zuid)
      const sites = zuids.reduce((sites, zuid) => {
        sites[zuid] = {}
        return sites
      }, {})

      action.sites.forEach(site => {
        sites[site.zuid] = site
      })

      return sites

    case 'FETCH_SITES_ERROR':
      // TODO show global growl of error
      // leave state as is
      return state

    case 'CHANGE_DOMAIN':
      let changeDomain = state.sites.filter(site => site.zuid === action.zuid)
      return state

    default:
      return state
  }
}

export function changeDomain(type, zuid) {
  return dispatch({
    type: 'CHANGE_DOMAIN',
    type,
    zuid
  })
}

export function getSites (id) {
  return (dispatch) => {
    dispatch({
      type: 'FETCHING_SITES'
    })

    dispatch({
      type: 'FETCH_SITES_SUCCESS',
      sites: [{
        zuid: 'xxxxx0',
        name: 'Hofbrauhaus Brand Epicenter / America Corp',
        domain: '',
        domainSelect: 'no',
        dns: '',
        stage: 'http://2xzzl8fb.sites.zesty.localdev:3001/',
        blueprintImgUrl: 'https://raw.githubusercontent.com/zesty-io/plate-material-ui/master/shield.png',
        blueprint: 'Material UI Blueprint',
        blueprintDetails: 'these are details about the selected blueprint, it is probably a good blueprint that youll really like',
        metadata: {
          plan: 'Site in Development',
          contributors: 3,
          createdOn:'12-3-18',
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
            dev: 0,
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
      }, {
        zuid: 'xxxxx1',
        name: 'Hofbrauhaus America Corporate',
        domain: 'https://www.hofbrauhaus.us',
        stage: 'http://2xzzl8fb.sites.zesty.localdev:3001/'
      }, {
        zuid: 'xxxxx2',
        name: 'Hofbrauhaus FR - Las Vegas',
        domain: 'https://www.hofbrauhauslasvegas.com',
        stage: 'http://2xzzl8fb.sites.zesty.localdev:3001/'
      }, {
        zuid: 'xxxxx3',
        name: 'New Site',
        domain: 'https://www.newsite.com',
        stage: 'http://2xzzl8fb.sites.zesty.localdev:3001/'
      }, {
        zuid: 'xxxxx4',
        name: 'More Fake Data',
        domain: 'https://www.fakedata.com',
        stage: 'http://2xzzl8fb.sites.zesty.localdev:3001/'
      }, {
        zuid: 'xxxxx4',
        name: 'Hofbrauhaus Brand Epicenter / America Corp',
        domain: '',
        stage: 'http://2xzzl8fb.sites.zesty.localdev:3001/'
      }, {
        zuid: 'xxxxx5',
        name: 'Hofbrauhaus America Corporate',
        domain: 'https://www.hofbrauhaus.us',
        stage: 'http://2xzzl8fb.sites.zesty.localdev:3001/'
      }, {
        zuid: 'xxxxx6',
        name: 'Hofbrauhaus FR - Las Vegas',
        domain: 'https://www.hofbrauhauslasvegas.com',
        stage: 'http://2xzzl8fb.sites.zesty.localdev:3001/'
      }, {
        zuid: 'xxxxx7',
        name: 'Hofbrauhaus FR - Chicago',
        domain: 'https://www.hofbrauhauschicago.com',
        stage: 'http://2xzzl8fb.sites.zesty.localdev:3001/'
      }, {
        zuid: 'xxxxx8',
        name: 'Hofbrauhaus Brand Epicenter / America Corp',
        domain: '',
        stage: 'http://2xzzl8fb.sites.zesty.localdev:3001/'
      }, {
        zuid: 'xxxxx9',
        name: 'Hofbrauhaus America Corporate',
        domain: 'https://www.hofbrauhaus.us',
        stage: 'http://2xzzl8fb.sites.zesty.localdev:3001/'
      }, {
        zuid: 'xxxxx10',
        name: 'Hofbrauhaus FR - Las Vegas',
        domain: 'https://www.hofbrauhauslasvegas.com',
        stage: 'http://2xzzl8fb.sites.zesty.localdev:3001/'
      }, {
        zuid: 'xxxxx11',
        name: 'Hofbrauhaus FR - Chicago',
        domain: 'https://www.hofbrauhauschicago.com',
        stage: 'http://2xzzl8fb.sites.zesty.localdev:3001/'
      }]
    })

    // TODO implement sites endpoint
    // fetch(`http://localhost:9001/sites/${id}`)
    //   .then(res => res.json())
    //   .then(user => {
    //     console.log('user', user)
    //     dispatch({
    //       type: 'FETCH_SITES_SUCCESS',
    //       id,
    //       user
    //     })
    //   })
    //   .catch(err => {
    //     console.error(err)
    //     dispatch({
    //       type: 'FETCH_SITES_ERROR',
    //       id,
    //       err
    //     })
    //   })
  }
}


