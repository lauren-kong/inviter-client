import axios from 'axios'

const url = 'http://localhost:5000/api/users'
export const createUser = (newUser) => axios.post(`${url}/register`, newUser)
