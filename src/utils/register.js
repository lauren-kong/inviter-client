export function toValidNumber(countryObj, mobileNumber) {
  const code = countryObj.phone
  const mobileArr = mobileNumber.split('')
  mobileArr.splice(0, 1)
  const validNumber = mobileArr.filter((number) => number !== '-' || number !== ' ').join('')
  return `+${code}${validNumber}`
}
