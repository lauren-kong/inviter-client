import { createUser } from '../api'

export const REGISTER_USER = 'REGISTER_USER'
export const registerUser = (newUser) => async (dispatch) => {
  try {
    const { data } = await createUser(newUser)
    dispatch({ type: REGISTER_USER, payload: data })
    return 'registered'
  } catch (error) {
    console.log(error)
  }
}
