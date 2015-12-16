
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { getRootStore } from './lib/stores'
import { createHistory } from 'history'
import { Router } from 'react-router'
import routes from './routes'

if (__DEV__) {
  const Perf = require('react/lib/ReactPerf')

  // Export React and Performance Utility for debugging
  window.React = React
  window.Perf = Perf
}

const store = getRootStore()
const history = createHistory()
const rootEl = document.getElementById('app')

render(
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>,
  rootEl
)
