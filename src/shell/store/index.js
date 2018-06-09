import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, combineReducers, applyMiddleware } from 'redux'

import { user } from './user'
import { auth } from './auth'
import { settings } from './settings'
import { notifications } from './notifications'
// import { modal } from './modal'
import { confirm } from './confirm'
import { systemRoles } from './systemRoles'
import { properties } from '../../apps/properties/src/store'
import { teams } from '../../apps/teams/src/store'

const loggerMiddleware = createLogger({
  collapsed: true,
  diff: true
})

const appReducer = combineReducers({
  ...properties,
  user,
  teams,
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

const middleware =
  CONFIG.ENV === 'production'
    ? applyMiddleware(thunkMiddleware)
    : applyMiddleware(thunkMiddleware, loggerMiddleware)

export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  middleware
)
