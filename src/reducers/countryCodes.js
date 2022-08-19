import countries from '../info/countries'

import { GET_COUNTRIES } from '../actions/countries'
const countryCodes = (state = countries, action) => {
  const { type } = action
  switch (type) {
    case GET_COUNTRIES:
      return state
    default:
      return state
  }
}
export default countryCodes
