import { request } from '../../../../util/request'
import { normalizeSites } from '../store'
import { notify } from '../../../../shell/store/notifications'

export function sites(state = {}, action) {
  switch (action.type) {
    case 'FETCH_SITES_SUCCESS':
    case 'FETCH_SITES_INVITES_SUCCESS':
      return { ...state, ...normalizeSites(action.sites) }

    case 'UPDATE_SITE_SUCCESS':
    case 'FETCH_SITE_SUCCESS':
      return { ...state, [action.site.ZUID]: action.site }

    case 'CREATE_SITE_SUCCESS':
      return { ...state, [action.site.ZUID]: action.site }

    case 'DELETE_INVITE_SUCCESS':
      return Object.keys(state)
        .filter(ZUID => state[ZUID].inviteZUID !== action.inviteZUID)
        .reduce((acc, ZUID) => {
          acc[ZUID] = state[ZUID]
          return acc
        }, {})

    case 'SORT_SITES':
      return action.sites

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
      `${CONFIG.API_ACCOUNTS}/invites/${inviteZUID}?acceptInvite=true`,
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
    dispatch({ type: 'DELETE_INVITE' })
    return request(
      `${CONFIG.API_ACCOUNTS}/invites/${inviteZUID}?declineInvite=true`,
      {
        method: 'PUT'
      }
    )
      .then(res => {
        // return dispatch(fetchSitesWithInvites())
        dispatch({
          type: 'DELETE_INVITE_SUCCESS',
          inviteZUID
        })
        return res.data
      })
      .catch(err => {
        dispatch({ type: 'DELETE_INVITE_FAILURE' })
        throw err
      })
  }
}

export function cancelInvite(inviteZUID) {
  return dispatch => {
    dispatch({ type: 'DELETE_INVITE' })
    return request(
      `${CONFIG.API_ACCOUNTS}/invites/${inviteZUID}?cancelInvite=true`,
      {
        method: 'PUT'
      }
    )
      .then(data => {
        dispatch({ type: 'DELETE_INVITE_SUCCESS', data })
        return data
      })
      .catch(err => {
        dispatch({ type: 'DELETE_INVITE_FAILURE' })
        throw err
      })
  }
}

export function sendInvite(payload) {
  return (dispatch, getState) => {
    const state = getState()

    // NOTE once custom roles are ready we will need to select
    // from the instances roles.
    const role = state.systemRoles[payload.inviteeRoleZUID]

    if (!role) {
      throw new Error(`Invalid role selected: ${payload.inviteeRoleZUID}`)
      return
    }

    return request(`${CONFIG.API_ACCOUNTS}/invites`, {
      method: 'POST',
      json: true,
      body: {
        inviteeEmail: payload.inviteeEmail,
        entityZUID: payload.entityZUID,
        accessLevel: role.accessLevel // NOTE support access levels until custom roles are complete
        // roleZUID: payload.roleZUID
      }
    })
      .then(res => {
        dispatch(
          notify({
            HTML: `<i class="fa fa-check-square-o" aria-hidden="true"></i>&nbsp;Invite sent to <strong>${
              res.data.inviteeEmail
            }</strong>`,
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
            HTML: `<i class="fa fa-exclamation-triangle" aria-hidden="true"></i>&nbsp;An error occurred sending the invite: ${err}`,
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

export const removeUser = (userZUID, roleZUID) => {
  return dispatch => {
    dispatch({ type: 'REMOVE_USER' })
    return request(
      `${CONFIG.API_ACCOUNTS}/users/${userZUID}/roles/${roleZUID}`,
      { method: 'DELETE' }
    )
      .then(data => {
        dispatch({ type: 'REMOVE_USER_SUCCESS', data })
        return data
      })
      .catch(err => {
        console.table(err)
        dispatch({ type: 'REMOVE_USER_ERROR' })
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
