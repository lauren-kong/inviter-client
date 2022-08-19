export const GET_COUNTRIES = 'GET_COUNTRIES'
export const fetchCountries = () => async (dispatch) => {
  dispatch({ type: GET_COUNTRIES })
}
