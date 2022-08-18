import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import reducers from './reducers'

import { BrowserRouter as Router } from 'react-router-dom'

const store = configureStore({ reducer: reducers })

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>
)
