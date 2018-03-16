import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import createDebounce from 'redux-debounced'

import { user } from './user'
import { auth } from './auth'
import {
  sites,
  filteredSites,
  blueprints
} from '../../apps/properties/src/store'
import { siteUsers } from '../../apps/properties/src/store/siteUsers'
import { siteCompanies } from '../../apps/properties/src/store/siteCompanies'
import { messages } from '../../apps/messages/src/store'
import { profile } from '../../apps/account/src/store'

const loggerMiddleware = createLogger({
  collapsed: true,
  diff: true
})

// const rootReducer = combineReducers({user, sites})
const rootReducer = combineReducers({
  auth,
  user,
  sites,
  siteUsers,
  siteCompanies,
  filteredSites,
  blueprints,
  messages,
  profile
})

export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(
    createDebounce(),
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
  )
)
