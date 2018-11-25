/* global window:true */
/* eslint no-underscore-dangle: 0 */

import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './index'

const loadDevTools = () =>
  process.env.NODE_ENV === 'development' && window.devToolsExtension
    ? window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
    : f => f

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    loadDevTools()
  )
)
export default () => store
