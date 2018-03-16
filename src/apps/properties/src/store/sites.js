import { request } from '../../../../util/request'
import config from '../../../../shell/config'

import { normalizeSites } from '../store'

export function sites(state = {}, action) {
  switch (action.type) {
    case 'FETCHING_SITES':
      // TODO show loading state?
      return state

    case 'FETCH_SITES_SUCCESS':
      let sites = normalizeSites(action.sites)

      // TODO invite site test
      sites['0-test-invite'] = {
        invite: true,
        ID: 7353800,
        ZUID: '8-45a294a-1zg0cg',
        EcoID: 144,
        PropertyTypeID: 1,
        RandomHashID: '385b14d47412fe6c30292f53473d62a5',
        Domain: 'stuartrunyan.com',
        DomainVerified: true,
        DevelopmentWebsite: false,
        AccountName: 'stuartrunyan.com',
        LegacyDiscountReason: null,
        PlanID: 14,
        Addons: null,
        UpdatedDate: '2017-10-26T20:16:24Z',
        PaymentMethod: null,
        Internal: false,
        Cancelled: false,
        CancelledReason: null,
        CancelledCustomerReason: null,
        CancelledDate: null,
        Zesty2Account: false,
        ContainerNameOverride: null,
        CDNURL: 'https://58h1pb.media.zestyio.com',
        Plugins: null,
        EarlyAccessTier: 0,
        DateActive: null,
        CreatedDatetime: '2015-04-29T13:08:46Z',
        CreatedByUserID: 20472736,
        ThirdPartyOAuthTokens: '{"google":"421"}',
        Favicon: null,
        Referrer: 'https://zesty.io/',
        InitialPlate: 15,
        RequiresTwoFactor: 0,
        createdAt: null,
        updatedAt: '2015-05-01T16:31:41Z',
        deletedAt: null
      }

      return sites
    // return {}

    case 'FETCH_SITES_ERROR':
      // TODO show global growl of error
      // leave state as is
      return state

    default:
      return state
  }
}

export function fetchSites(userZuid) {
  return dispatch => {
    dispatch({
      type: 'FETCHING_SITES'
    })

    request(`http://${config.API_ACCOUNTS}:6010/v1/instances`, {
      headers: {
        'User-Zuid': userZuid
      }
    })
      .then(sites => {
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
