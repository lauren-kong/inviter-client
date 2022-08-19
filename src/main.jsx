import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import reducers from './reducers'

import { BrowserRouter as Router } from 'react-router-dom'

import { createTheme, ThemeProvider } from '@mui/material'

const store = configureStore({ reducer: reducers })

const inviterTheme = createTheme({
  palette: {
    primary: {
      light: '#e4b3b3a0',
      main: '#d9a8a8',
      dark: '#c47f7f',
      contrastText: '#ffffff',
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={inviterTheme}>
      <Router>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    </ThemeProvider>
  </React.StrictMode>
)
