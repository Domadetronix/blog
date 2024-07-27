import React from 'react'
import ReactDOM from 'react-dom/client'
// eslint-disable-next-line import/no-extraneous-dependencies
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { compose, configureStore } from '@reduxjs/toolkit'
import App from './components/App/app'
import { reducers } from './store/reducer'
import './index.scss'

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsDenylist, actionsCreators, serialize...
      })
    : compose

const store = configureStore({ reducer: reducers }, composeEnhancers)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
