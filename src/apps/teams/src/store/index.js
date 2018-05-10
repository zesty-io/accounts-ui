import { request } from '../../../../util/request'
import config from '../../../../shell/config'

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

// CRUD teams here

export const fetchTeams = userZUID => {
  return dispatch => {
    dispatch({
      type: 'FETCH_TEAMS_SUCCESS',
      data: [
        {
          ZUID: 'dev-team-zuid',
          name: 'Dev Team',
          members: [
            { name: 'emily', ZUID: 'userAZUID', email: 'aras@envoy.com' },
            { name: 'sadfhadfhara', ZUID: 'userZUID', email: 'aras@ensdfgvoy.com' },
            { name: 'sarsdhsdfa', ZUID: 'userZUIdsfgD', email: 'aras@envsdfgoy.com' },
            { name: 'don', ZUID: 'useraASZUID', email: 'e@mail.com' }
          ]
        },
        {
          ZUID: 'seo-team-zuid',
          name: 'SEO Team',
          members: [
            { name: 'sardfhgdsfa', ZUID: 'userZUsdhsdfhID', email: 'aras@envoy.com' },
            { name: 'sa544554ra', ZUID: 'userZasdfUID', email: 'aras@envoy.com' },
            { name: 'charles', ZUID: 'userZUsdfhID', email: 'e@mail.com' }
          ]
        },
        {
          ZUID: 'content-team-zuid',
          name: 'Content Team',
          members: [
            { name: 'adam', ZUID: 'userasdfZUID', email: 'aras@envoy.com' },
            { name: 'linda', ZUID: 'usersadfZUID', email: 'aras@envoy.com' },
            { name: 'steve', ZUID: 'userasdfZasdfUID', email: 'aras@envoy.com' },
            { name: 'dave', ZUID: 'userZUsdfhsdID', email: 'aras@envoy.com' },
            { name: 'brett', ZUID: 'userdsaZUID', email: 'e@mail.com' }
          ]
        }
      ]
    })
  }
  // return dispatch => {
  //   dispatch({ type: 'FETCHING_TEAMS' })
  //   return request(`${config.API_ACCOUNTS}/teams/${userZUID}`)
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
}
