import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'

import { user } from './user'
import { auth } from './auth'
import { settings } from './settings'
import { notifications } from './notifications'
// import { modal } from './modal'
import { confirm } from './confirm'
import { systemRoles } from './systemRoles'
import { ecosystems } from './ecosystems'

import { properties } from '../../apps/properties/src/store'

// Teams
import { teams } from '../../apps/teams/src/store/teams'
import { teamInvites } from '../../apps/teams/src/store/teamInvites'
import { teamInstances } from '../../apps/teams/src/store/teamInstances'
import { teamMembers } from '../../apps/teams/src/store/teamMembers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const loggerMiddleware = createLogger({
  collapsed: true
})

const appReducer = combineReducers({
  ...properties,
  ecosystems,
  user,
  teams,
  teamInstances,
  teamInvites,
  teamMembers,
  auth,
  settings,
  // modal,
  confirm,
  notifications,
  systemRoles
})

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = {}
  }
  return appReducer(state, action)
}

// const middleware =
//   CONFIG.ENV === 'production'
//     ? applyMiddleware(thunkMiddleware)
//     : applyMiddleware(thunkMiddleware, loggerMiddleware)

export const store = createStore(
  rootReducer,
  composeEnhancers(
    CONFIG.ENV === 'production'
      ? applyMiddleware(thunkMiddleware)
      : applyMiddleware(thunkMiddleware, loggerMiddleware)
  )
)

// CONFIG.ENV === 'production'
//   ? createStore(rootReducer, middleware)
//   : createStore(
//       rootReducer,
//       window.__REDUX_DEVTOOLS_EXTENSION__ &&
//         window.__REDUX_DEVTOOLS_EXTENSION__(),
//       middleware
//     )
