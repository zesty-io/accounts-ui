import { request } from '../../../../util/request'
import { notify } from '../../../../shell/store/notifications'

export function teams(state = {}, action) {
  switch (action.type) {
    case 'FETCH_TEAMS_SUCCESS':
      const teams = Object.keys(action.data).reduce((acc, team) => {
        acc[action.data[team].ZUID] = action.data[team]
        return acc
      }, {})
      return { ...state, ...teams }
    case 'CREATE_TEAM_SUCCESS':
      return { ...state, [action.data.ZUID]: action.data }
    case 'DELETING_TEAM_SUCCESS':
      const removed = state
      delete removed[action.data.ZUID]
      return removed
    case 'FETCHING_TEAMS_FAILURE':
    case 'FETCHING_TEAMS':
    default:
      return state
  }
}

// // CRUD teams here

export const fetchTeams = userZUID => {
  return dispatch => {
    dispatch({ type: 'FETCHING_TEAMS' })
    return request(`${CONFIG.API_ACCOUNTS}/teams`)
      .then(res => {
        dispatch({ type: 'FETCH_TEAMS_SUCCESS', data: res.data })
        return res.data
      })
      .catch(err => {
        dispatch({ type: 'FETCHING_TEAMS_FAILURE', err })
        console.table(err)
        return err
      })
  }
}

export const createTeam = Name => {
  // request to POST with payload { Name: name }
  // should return teamZUID and add code
  return dispatch => {
    dispatch({ type: 'CREATING_TEAM' })
    return request(`${CONFIG.API_ACCOUNTS}/teams`, {
      method: 'POST',
      json: true,
      body: {
        Name
      }
    })
      .then(res => {
        dispatch({ type: 'CREATE_TEAM_SUCCESS', data: res.data })
        dispatch(
          notify({
            type: 'success',
            message: 'Created team successfully'
          })
        )
        return res.data
      })
      .catch(err => {
        dispatch({ type: 'CREATING_TEAM_FAILURE', err })
        console.table(err)
        return err
      })
  }
}

export const updateTeam = (teamZUID, Name) => {
  // request to PUT with payload { Name: name }
  return dispatch => {
    dispatch({ type: 'UPDATING_TEAM' })
    return request(`${CONFIG.API_ACCOUNTS}/teams/${teamZUID}`, {
      method: 'PUT',
      json: true,
      body: {
        Name
      }
    })
      .then(res => {
        dispatch({ type: 'UPDATING_TEAM_SUCCESS', data: res.data })
        dispatch(
          notify({
            type: 'success',
            message: 'Updated team name successfully'
          })
        )
        return res.data
      })
      .catch(err => {
        dispatch({ type: 'UPDATING_TEAM_FAILURE', err })
        dispatch(
          notify({
            type: 'error',
            message: `Update error, no update was made`
          })
        )
        console.table(err)
        return err
      })
  }
}

export const inviteGroup = (teamZUID, groupArray) => {
  // takes an array and sends them to a group invite endpoint
}

export const inviteMember = (teamZUID, inviteeEmail) => {
  // individual invite endpoint
  return dispatch => {
    dispatch({ type: 'INVITING_TEAM_MEMBER' })
    return request(`${CONFIG.API_ACCOUNTS}/teams/invites`, {
      method: 'POST',
      json: true,
      body: {
        teamZUID,
        inviteeEmail
      }
    })
      .then(res => {
        dispatch({ type: 'INVITING_TEAM_MEMBER_SUCCESS', data: res.data })
        dispatch(
          notify({
            type: 'success',
            message: `Invite sent`
          })
        )
        return res.data
      })
      .catch(err => {
        dispatch({ type: 'INVITING_TEAM_MEMBER_FAILURE', err })
        dispatch(
          notify({
            type: 'error',
            message: `Invite error, no invite was sent`
          })
        )
        console.table(err)
        return err
      })
  }
}

export const removeMember = (teamZUID, member) => {
  // remove individual from team
}

export const deleteTeam = (teamZUID, Name) => {
  return dispatch => {
    dispatch({ type: 'DELETING_TEAM' })
    return request(`${CONFIG.API_ACCOUNTS}/teams/${teamZUID}`, {
      method: 'DELETE',
      json: true,
      body: {
        Name
      }
    })
      .then(res => {
        dispatch({ type: 'DELETING_TEAM_SUCCESS', data: res.data })
        return res.data
      })
      .catch(err => {
        dispatch({ type: 'DELETING_TEAM_FAILURE', err })
        console.table(err)
        return err
      })
  }
}

// // FAKE DATA USED FOR MOCKUP
// const fakeTeamData = [
//   {
//     ZUID: 'dev-team-zuid',
//     name: 'Dev Team',
//     hash: 'gyfdgwy523',
//     instances: [{ ZUID: '823b', role: 'Admin', name: 'website' }],
//     members: [
//       { name: 'emily', ZUID: 'usaerAZUID', email: 'aras@envoy.com' },
//       {
//         name: 'sadf5hadfhara',
//         ZUID: 'usesssrsZUID',
//         email: 'aras@ensdfgvoy.com',
//         admin: true
//       },
//       {
//         name: 'sars3dhsdfa',
//         ZUID: 'ss',
//         email: 'aras@envsdfgoy.com'
//       },
//       { name: 'don', ZUID: 'useasraAdSZUID', email: 'e@mail.com' }
//     ]
//   },
//   {
//     ZUID: 'seo-team-zuid',
//     hash: 'gyfdgwwuhyty523',
//     name: 'SEO Team',
//     instances: [{ ZUID: '823b', role: 'Admin', name: 'property' }],
//     members: [
//       {
//         name: 'sardfdhgdsfa',
//         ZUID: 'usssserZUsdsdhsdfhID',
//         email: 'aras@envoy.com'
//       },
//       {
//         name: 'sa54455dd4ra',
//         ZUID: 'udserZ1asdfUID',
//         email: 'aras@envoy.com'
//       },
//       { name: 'charles', ZUID: 'userZ1UsddfhID', email: 'e@mail.com' }
//     ]
//   },
//   {
//     ZUID: 'content-team-zuid',
//     hash: 'gyfdgw376y523',
//     name: 'Content Team',
//     invited: true,
//     instances: [{ ZUID: '823b', role: 'Admin', name: 'something.com' }],
//     members: [
//       { name: 'adam', ZUID: 'us1eraddsdfZUID', email: 'aras@envoy.com' },
//       {
//         name: 'linda',
//         ZUID: 'use1rddsssadfZUID',
//         email: 'aras@envoy.com',
//         admin: true
//       },
//       {
//         name: 'steve',
//         ZUID: 'us1erassdfZasdfUID',
//         email: 'aras@envoy.com'
//       },
//       { name: 'dave', ZUID: 'userZUsdfhsdID', email: 'aras@envoy.com' },
//       { name: 'brett', ZUID: 'userdsaZUID1', email: 'e@mail.com' }
//     ]
//   }
// ]
