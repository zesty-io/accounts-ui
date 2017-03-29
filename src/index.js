import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router, Route, browserHistory } from 'react-router'

import {store} from './reducers'

import App from './views/app'
import Dashboard from './views/dashboard'

ReactDOM.render((
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route component={App}>
              {/* <Route path="/dashboard" component={Dashboard} /> */}
            </Route>
        </Router>
    </Provider>
), document.getElementById('app'))
