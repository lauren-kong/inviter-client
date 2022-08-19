export const initialNewUserState = {
  email: '',
  password: '',
  firstname: '',
  lastname: '',
  mobile: '',
  kakao: '',
  facebook: '',
}

import countries from '../data/countries'
export const nz = () => countries.find((country) => country.code === 'NZ')

export function toValidNumber(countryObj, mobileNumber) {
  const code = countryObj.phone
  const mobileArr = mobileNumber.split('')
  mobileArr.splice(0, 1)
  const validNumber = mobileArr.filter((number) => number !== '-' || number !== ' ').join('')
  return `+${code}${validNumber}`
}
