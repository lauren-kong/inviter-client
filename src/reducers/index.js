import { combineReducers } from 'redux'
import countriesReducer from './countryCodes'

const reducers = combineReducers({
  countries: countriesReducer,
})

export default reducers
