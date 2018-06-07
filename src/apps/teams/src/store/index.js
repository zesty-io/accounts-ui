import { request } from '../../../../util/request'

export function teams(state = {}, action) {
  switch (action.type) {
    case 'FETCH_TEAMS_SUCCESS':
      return { ...state, ...action.data }
    case 'FETCHING_TEAMS_FAILURE':
    case 'FETCHING_TEAMS':
    default:
      return state
  }
}

// FAKE DATA USED FOR MOCKUP
const fakeTeamData = [
  {
    ZUID: 'dev-team-zuid',
    name: 'Dev Team',
    hash: 'gyfdgwy523',
    instances: [
      { ZUID: '823b', role: 'Admin', name: 'website'}
    ],
    members: [
      { name: 'emily', ZUID: 'usaerAZUID', email: 'aras@envoy.com' },
      {
        name: 'sadf5hadfhara',
        ZUID: 'usesssrsZUID',
        email: 'aras@ensdfgvoy.com'
      },
      {
        name: 'sars3dhsdfa',
        ZUID: 'ss',
        email: 'aras@envsdfgoy.com'
      },
      { name: 'don', ZUID: 'useasraAdSZUID', email: 'e@mail.com' }
    ]
  },
  {
    ZUID: 'seo-team-zuid',
    hash: 'gyfdgwwuhyty523',
    name: 'SEO Team',
    instances: [
      { ZUID: '823b', role: 'Admin', name: 'property'}
    ],
    members: [
      {
        name: 'sardfdhgdsfa',
        ZUID: 'usssserZUsdsdhsdfhID',
        email: 'aras@envoy.com'
      },
      {
        name: 'sa54455dd4ra',
        ZUID: 'udserZ1asdfUID',
        email: 'aras@envoy.com'
      },
      { name: 'charles', ZUID: 'userZ1UsddfhID', email: 'e@mail.com' }
    ]
  },
  {
    ZUID: 'content-team-zuid',
    hash: 'gyfdgw376y523',
    name: 'Content Team',
    instances: [
      { ZUID: '823b', role: 'Admin', name: 'something.com'}
    ],
    members: [
      { name: 'adam', ZUID: 'us1eraddsdfZUID', email: 'aras@envoy.com' },
      {
        name: 'linda',
        ZUID: 'use1rddsssadfZUID',
        email: 'aras@envoy.com'
      },
      {
        name: 'steve',
        ZUID: 'us1erassdfZasdfUID',
        email: 'aras@envoy.com'
      },
      { name: 'dave', ZUID: 'userZUsdfhsdID', email: 'aras@envoy.com' },
      { name: 'brett', ZUID: 'userdsaZUID1', email: 'e@mail.com' }
    ]
  }
]
// CRUD teams here

export const fetchTeams = userZUID => {
  //TODO: endpoint for teams
  // return dispatch => {
  //   dispatch({ type: 'FETCHING_TEAMS' })
  //   return request(`${CONFIG.API_ACCOUNTS}/teams/${userZUID}`)
  //     .then(res => {
  //       dispatch({ type: 'FETCHING_TEAMS_SUCCESS', data: res.data })
  //       return res.data
  //     })
  //     .catch(err => {
  //       dispatch({ type: 'FETCHING_TEAMS_FAILURE', err })
  //       console.table(err)
  //       return err
  //     })
  // }
  return dispatch => {
    dispatch({
      type: 'FETCH_TEAMS_SUCCESS',
      data: fakeTeamData
    })
  }
}

export const createTeam = name => {
  // request to POST with payload { Name: name }
  // should return teamZUID and add code
}

export const updateTeam = (teamZUID, name) => {
  // request to PUT with payload { Name: name }
}

export const inviteGroup = (teamZUID, groupArray) => {
  // takes an array and sends them to a group invite endpoint
}

export const inviteMember = (teamZUID, memberEmail) => {
  // individual invite endpoint
}

export const removeMember = (teamZUID, member) => {
  // remove individual from team
}

export const deleteTeam = team => {

}
