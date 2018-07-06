import { request } from '../../../../util/request'
import { normalizeSites } from '../store'
import { notify } from '../../../../shell/store/notifications'

export function sites(state = {}, action) {
  switch (action.type) {
    case 'FETCH_SITES_SUCCESS':
    case 'FETCH_SITES_INVITES_SUCCESS':
      return { ...state, ...normalizeSites(action.sites) }

    case 'FETCH_SITE_SUCCESS':
    case 'UPDATE_SITE_SUCCESS':
    case 'CREATE_SITE_SUCCESS':
      return { ...state, [action.site.ZUID]: action.site }

    case 'DECLINE_INVITE_SUCCESS':
      return Object.keys(state)
        .filter(ZUID => state[ZUID].inviteZUID !== action.inviteZUID)
        .reduce((acc, ZUID) => {
          acc[ZUID] = state[ZUID]
          return acc
        }, {})

    case 'SORT_SITES':
      return action.sites

    case 'UPDATE_SITE_DOMAIN':
      return {
        ...state,
        [action.siteZUID]: { ...state[action.siteZUID], domain: action.domain }
      }
    case 'UPDATE_SITE_BLUEPRINT_SUCCESS':
      return {
        ...state,
        [action.siteZUID]: {
          ...state[action.siteZUID],
          blueprintID: action.blueprintID
        }
      }
    default:
      return state
  }
}

export function fetchSites() {
  return dispatch => {
    dispatch({
      type: 'FETCHING_SITES'
    })
    return request(`${CONFIG.API_ACCOUNTS}/instances`)
      .then(sites => {
        sites.data.sort((prev, next) => {
          if (prev.name < next.name) {
            return -1
          }
          if (prev.name > next.name) {
            return 1
          }
          return 0
        })

        dispatch({
          type: 'FETCH_SITES_SUCCESS',
          sites: sites.data
        })
        return sites
      })
      .catch(err => {
        console.table(err)
        dispatch(
          notify({
            message: 'There was a problem fetching your instances',
            type: 'error'
          })
        )
        dispatch({
          type: 'FETCH_SITES_ERROR',
          err
        })
      })
  }
}

export function fetchSitesWithInvites() {
  return dispatch => {
    dispatch({
      type: 'FETCHING_SITES_INVITES'
    })
    return request(`${CONFIG.API_ACCOUNTS}/instances/invites`)
      .then(sites => {
        sites.data.sort((prev, next) => {
          if (prev.name < next.name) {
            return -1
          }
          if (prev.name > next.name) {
            return 1
          }
          return 0
        })

        dispatch({
          type: 'FETCH_SITES_INVITES_SUCCESS',
          sites: sites.data
        })
        return sites
      })
      .catch(err => {
        console.table(err)
        dispatch(
          notify({
            message: 'There was a problem fetching your instances',
            type: 'error'
          })
        )
        dispatch({
          type: 'FETCH_SITES_INVITES_ERROR',
          err
        })
      })
  }
}

export function fetchSite(siteZUID) {
  return dispatch => {
    dispatch({
      type: 'FETCHING_SITES'
    })
    return request(`${CONFIG.API_ACCOUNTS}/instances/${siteZUID}`)
      .then(res => {
        dispatch({
          type: 'FETCH_SITE_SUCCESS',
          site: res.data
        })

        return res.data
      })
      .catch(err => {
        console.table(err)
        dispatch(
          notify({
            message: 'There was a problem fetching sites',
            type: 'error'
          })
        )
        dispatch({
          type: 'FETCH_SITE_ERROR',
          err
        })
      })
  }
}

export function updateSite(siteZUID, payload) {
  return dispatch => {
    dispatch({
      type: 'UPDATING_SITE'
    })
    return request(`${CONFIG.API_ACCOUNTS}/instances/${siteZUID}`, {
      method: 'PUT',
      json: true,
      body: payload
    })
      .then(res => {
        dispatch({
          type: 'UPDATE_SITE_SUCCESS',
          site: res.data
        })
        return res.data
      })
      .catch(err => {
        dispatch({ type: 'UPDATE_SITE_FAILURE' })
        console.table(err)
        throw err
      })
  }
}

export function updateSiteBlueprint(siteZUID, payload) {
  return dispatch => {
    dispatch({
      type: 'UPDATING_SITE'
    })
    return request(
      `${CONFIG.API_ACCOUNTS}/instances/${siteZUID}?action=updateBlueprint`,
      {
        method: 'PUT',
        json: true,
        body: payload
      }
    )
      .then(res => {
        dispatch({
          type: 'UPDATE_SITE_BLUEPRINT_SUCCESS',
          siteZUID,
          blueprintID: payload.blueprintID
        })
        return res.data
      })
      .catch(err => {
        dispatch({ type: 'UPDATE_SITE_FAILURE' })
        console.table(err)
        throw err
      })
  }
}

export function createInstance(name) {
  return dispatch => {
    dispatch({
      type: 'CREATING_SITE'
    })
    return request(`${CONFIG.API_ACCOUNTS}/instances`, {
      method: 'POST',
      json: true,
      body: { name }
    })
      .then(res => {
        dispatch({
          type: 'CREATE_SITE_SUCCESS',
          site: res.data
        })
        return res.data
      })
      .catch(err => {
        console.error(err)
        return err
      })
  }
}

// NOTE Should these not be part of this reducer?
export function acceptInvite(inviteZUID) {
  return dispatch => {
    dispatch({ type: 'ACCEPT_INVITE' })
    return request(
      `${CONFIG.API_ACCOUNTS}/invites/${inviteZUID}?action=accept`,
      {
        method: 'PUT'
      }
    )
      .then(data => {
        dispatch({ type: 'ACCEPT_INVITE_SUCCESS' })
        return data
      })
      .catch(err => {
        dispatch({ type: 'ACCEPT_INVITE_FAILURE' })
        dispatch(
          notify({
            message: `There was an error accepting the invite`,
            type: 'error'
          })
        )
        console.table(err)
        throw err
      })
  }
}

export function declineInvite(inviteZUID) {
  return dispatch => {
    dispatch({ type: 'DECLINE_INVITE' })
    return request(
      `${CONFIG.API_ACCOUNTS}/invites/${inviteZUID}?action=decline`,
      {
        method: 'PUT'
      }
    )
      .then(res => {
        dispatch({
          type: 'DECLINE_INVITE_SUCCESS',
          inviteZUID
        })
        return res.data
      })
      .catch(err => {
        dispatch({ type: 'DECLINE_INVITE_FAILURE' })
        throw err
      })
  }
}

export function cancelInvite(inviteZUID, siteZUID) {
  return dispatch => {
    dispatch({ type: 'CANCEL_INVITE' })
    return request(
      `${CONFIG.API_ACCOUNTS}/invites/${inviteZUID}?action=cancel`,
      {
        method: 'PUT'
      }
    )
      .then(res => {
        dispatch({
          type: 'CANCEL_INVITE_SUCCESS',
          userZUID: inviteZUID, // REMOVE_USER_SUCCESS uses the same logic so make these share the same key
          siteZUID
        })
        return res.data
      })
      .catch(err => {
        console.error(err)
        dispatch({
          type: 'CANCEL_INVITE_FAILURE',
          err
        })
      })
  }
}

export function sendInvite(siteZUID, inviteeEmail, inviteeRoleZUID) {
  return (dispatch, getState) => {
    const state = getState()
    const instanceRole = state.sitesRoles[siteZUID][inviteeRoleZUID]
    const systemRole = state.systemRoles[instanceRole.systemRoleZUID]

    return request(`${CONFIG.API_ACCOUNTS}/invites`, {
      method: 'POST',
      json: true,
      body: {
        inviteeEmail: inviteeEmail,
        entityZUID: siteZUID,
        accessLevel: systemRole.accessLevel // NOTE support access levels until custom roles are complete
        // roleZUID: payload.roleZUID
      }
    })
      .then(res => {
        dispatch(
          notify({
            message: `Invite sent to ${res.data.inviteeEmail}`,
            type: 'success'
          })
        )
        dispatch({
          type: 'SEND_INVITE_SUCCESS',
          user: res.data
        })
        return res.data
      })
      .catch(err => {
        console.error(err)
        dispatch(
          notify({
            message: `Error occurred sending the invite`,
            type: 'error'
          })
        )
        dispatch({
          type: 'SEND_INVITE_ERROR',
          err
        })
      })
  }
}

export const sortSites = sortBy => {
  return (dispatch, getState) => {
    const sitesObj = getState().sites
    let sites = Object.keys(sitesObj).map(site => sitesObj[site])
    if (sortBy === 'name') {
      sites.sort((prev, next) => {
        if (prev[sortBy] < next[sortBy]) {
          return -1
        }
        if (prev[sortBy] > next[sortBy]) {
          return 1
        }
        return 0
      })
    }
    if (sortBy === 'createdAt') {
      sites.sort((prev, next) => {
        const prevDate = Date.parse(prev[sortBy])
        const nextDate = Date.parse(next[sortBy])
        if (prevDate < nextDate) {
          return 1
        }
        if (prevDate > nextDate) {
          return -1
        }
        return 0
      })
    }

    return dispatch({
      type: 'SORT_SITES',
      sites: sites.reduce((acc, site) => {
        acc[site.ZUID] = site
        return acc
      }, {})
    })
  }
}

export function updateDomain(siteZUID, domain) {
  return dispatch => {
    return request(
      `${CONFIG.API_ACCOUNTS}/instances/${siteZUID}?action=updateDomain`,
      {
        method: 'PUT',
        json: true,
        body: { domain }
      }
    ).then(res => {
      dispatch({
        type: 'UPDATE_SITE_DOMAIN',
        domain,
        siteZUID
      })
      return res.data.domain
    })
  }
}

export function checkDNS(dnsObject) {
  return dispatch => {
    return request(`${CONFIG.API_ACCOUNTS}/instances/dns`, {
      method: 'POST',
      json: true,
      body: dnsObject
    }).then(res => {
      return res.data
    })
  }
}
