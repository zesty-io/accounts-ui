// Polyfills
// @see https://www.npmjs.com/package/core-js
// Our polyfills are to support IE11
// https://github.com/aspnet/JavaScriptServices/wiki/Supporting-Internet-Explorer-11-(or-older)
import 'core-js/fn/object/assign'
import 'core-js/fn/string/includes'
import 'core-js/fn/array/includes'
import 'core-js/fn/promise'
import 'whatwg-fetch'

// import moment from 'moment'
import cx from 'classnames'
import qs from 'qs'
import React from 'react'
import ReactDOM from 'react-dom'
import * as ReactRedux from 'react-redux'
import * as ReactRouter from 'react-router'
import * as ReactRouterDOM from 'react-router-dom'
import * as Redux from 'redux'
import * as ReduxThunk from 'redux-thunk'

window.cx = cx
window.qs = qs
window.React = React
window.ReactDOM = ReactDOM
window.ReactRedux = ReactRedux
window.ReactRouter = ReactRouter
window.ReactRouterDOM = ReactRouterDOM
window.Redux = Redux
window.ReduxThunk = ReduxThunk
// window.moment = moment
