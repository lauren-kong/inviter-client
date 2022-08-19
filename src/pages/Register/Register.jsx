import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Container, Box, Button, TextField, Autocomplete, Typography } from '@mui/material'

import { fetchCountries } from '../../actions'
import { toValidNumber, initialNewUserState, nz } from '../../utils'
import { registerUser } from '../../actions'
import './Register.css'
import styles from './style'

export const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const countries = useSelector((state) => state.countries)
  const emailRef = useRef()

  const [selectedCountry, setSelectedCountry] = useState(nz)
  const [mobile, setMobile] = useState('')
  const [newUser, setNewUser] = useState(initialNewUserState)
  const [showPassword, setShowPassword] = useState(false)
  const [triedRegister, setTriedRegister] = useState(false)
  const [emailValid, setEmailValid] = useState(false)

  useEffect(() => {
    dispatch(fetchCountries())
  }, [])

  function handleRegister() {
    const textfields = Array.from(document.querySelectorAll('input'))
    const requiredInputs = textfields.filter((input) => input.attributes.required)
    const emptyInputs = requiredInputs.filter((input) => !input.value)
    const isEmailValid = /\S+@\S+\.\S+/.test(emailRef.current.querySelector('input').value)
    setEmailValid(isEmailValid)

    console.log('emptyInputs', !emptyInputs.length === 0)
    console.log('isEmailValid', isEmailValid)
    if (emptyInputs.length === 0 && isEmailValid) {
      console.log('done')
      const validMobile = toValidNumber(selectedCountry, mobile)
      const newUserData = { ...newUser, mobile: validMobile }
      dispatch(registerUser(newUserData))
      setSelectedCountry(nz)
      setMobile('')
      setNewUser(initialNewUserState)
      setShowPassword(false)
      setTriedRegister(false)
      setEmailValid(false)
      navigate('/')
    } else {
      setTriedRegister(!triedRegister)
    }
  }

  return (
    newUser && (
      <Container sx={styles.container}>
        <Box sx={styles.titleBox}>
          <Box className="register-title">
            <Typography variant="h5">Registration</Typography>
          </Box>
          <Box className="name-field" sx={styles.nameBox}>
            <TextField
              error={triedRegister && !newUser.firstname}
              sx={styles.firstname}
              id="first-name"
              label="First Name"
              value={newUser.firstname}
              placeholder="First Name"
              onChange={(e) => setNewUser({ ...newUser, firstname: e.target.value })}
              type="text"
              required
              helperText={triedRegister && !newUser.firstname ? 'please enter your first name' : ''}
            />
            <TextField
              error={triedRegister && !newUser.lastname}
              sx={styles.lastname}
              id="last-name"
              label="Last Name"
              value={newUser.lastname}
              onChange={(e) => setNewUser({ ...newUser, lastname: e.target.value })}
              type="text"
              required
              helperText={triedRegister && !newUser.lastname ? 'please enter your last name' : ''}
            />
          </Box>
          <TextField
            ref={emailRef}
            error={(triedRegister && !newUser.email) || (triedRegister && !emailValid)}
            required
            id="email"
            label="Email"
            placeholder="example@email.com"
            type="email"
            fullWidth
            value={newUser.email}
            onChange={(e) => {
              setEmailValid(/\S+@\S+\.\S+/.test(e.target.value))
              setNewUser({ ...newUser, email: e.target.value })
            }}
            helperText={
              (triedRegister && !newUser.email && 'please enter your email') ||
              (triedRegister && !emailValid && 'wrong email format')
            }
          />
          <div className="password-field" style={styles.passwordDiv}>
            <TextField
              error={triedRegister && !newUser.password}
              required
              id="password"
              label="Password"
              placeholder="Password"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            />
            <Button
              sx={styles.pwdShowButton}
              variant="text"
              onClick={() => {
                setShowPassword(!showPassword)
              }}
            >
              Show
            </Button>
          </div>
          <div className="phone-field" style={styles.mobileDiv}>
            <Autocomplete
              id="country-select-demo"
              required
              sx={styles.countrySelect}
              options={countries}
              autoHighlight
              value={selectedCountry}
              onChange={(e, newValue) => setSelectedCountry(newValue)}
              isOptionEqualToValue={(option, value) => option.code === value.code}
              getOptionLabel={(option) => `${option.code} (+ ${option.phone})`}
              renderOption={(props, option) => (
                <Box component="li" sx={styles.countryList} {...props}>
                  <img
                    loading="lazy"
                    width="20"
                    src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                    srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                    alt={`+${option.phone}`}
                  />
                  {option.label} ({option.code}) +{option.phone}
                </Box>
              )}
              renderInput={(params) => {
                return (
                  <TextField
                    {...params}
                    label="Country"
                    inputProps={{
                      ...params.inputProps,
                    }}
                    onChange={(e) => console.log(e.target)}
                  />
                )
              }}
            />
            <TextField
              error={triedRegister && !mobile}
              required
              id="mobile"
              label="Mobile Number"
              placeholder="021-1234-5678"
              type="tel"
              fullWidth
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>
          <TextField
            id="kakaotalk"
            label="Kakaotalk Id"
            placeholder="Kakaotalk Id (Optional)"
            type="text"
            fullWidth
            value={newUser.kakao}
            onChange={(e) => setNewUser({ ...newUser, kakao: e.target.value })}
          />
          <TextField
            id="facebook"
            label="Facebook Id"
            placeholder="Facebook Id (Optional)"
            type="text"
            fullWidth
            value={newUser.facebook}
            onChange={(e) => setNewUser({ ...newUser, facebook: e.target.value })}
          />
          <Button variant="contained" fullWidth sx={{ height: '50px', fontSize: '18px' }} onClick={handleRegister}>
            Register
          </Button>
        </Box>
      </Container>
    )
  )
}
