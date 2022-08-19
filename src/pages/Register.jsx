import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Container,
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  TextField,
  Autocomplete,
  Typography,
  containerClasses,
} from '@mui/material'
import { fetchCountries } from '../actions'
import inviterLogo from '../../public/images/inviter-logo.png'

import { toValidNumber } from '../utils'

const initialNewUserState = {
  email: '',
  password: '',
  firstname: '',
  lastname: '',
  mobile: '',
  kakao: '',
  facebook: '',
}
export const Register = () => {
  const dispatch = useDispatch()
  const countries = useSelector((state) => state.countries)
  const [selectedCountry, setSelectedCountry] = useState({ code: 'NZ', label: 'New Zealand', phone: '64' })
  const [mobile, setMobile] = useState('')
  const [newUser, setNewUser] = useState(initialNewUserState)
  const [showPassword, setShowPassword] = useState(false)
  const [triedRegister, setTriedRegister] = useState(false)

  useEffect(() => {
    dispatch(fetchCountries())
  }, [])

  function handleRegister() {
    const textfields = Array.from(document.querySelectorAll('input'))
    console.log(textfields)
    const requiredInputs = textfields.filter((input) => input.attributes.required)
    const emptyInputs = requiredInputs.filter((input) => !input.value)

    if (!emptyInputs) {
      const validMobile = toValidNumber(selectedCountry, mobile)
      const newUserData = { ...newUser, mobile: validMobile }
    } else {
      setTriedRegister(!triedRegister)
    }
  }

  return (
    newUser && (
      <Container sx={{ width: '500px', height: '100vh', padding: '30px', marginTop: '30px' }}>
        <Box
          sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '30px' }}
        >
          <Box className="web-register">
            <Box className="logo">
              <img src={inviterLogo}></img>
              <Typography variant="body">Inviter</Typography>
            </Box>
            <Box className="register-title">
              <Typography variant="h5">Registration</Typography>
            </Box>
          </Box>
          <div className="name-field" style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <TextField
              error={triedRegister && !newUser.firstname}
              sx={{ width: '45%' }}
              id="first-name"
              label="First Name"
              value={newUser.firstname}
              placeholder="First Name"
              onChange={(e) => setNewUser({ ...newUser, firstname: e.target.value })}
              type="text"
              required
            />
            <TextField
              error={triedRegister && !newUser.lastname}
              sx={{ width: '45%' }}
              id="last-name"
              label="Last Name"
              value={newUser.lastname}
              onChange={(e) => setNewUser({ ...newUser, lastname: e.target.value })}
              type="text"
              required
            />
          </div>
          <TextField
            error={triedRegister && !newUser.email}
            required
            id="email"
            label="Email"
            placeholder="example@email.com"
            type="email"
            fullWidth
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <div
            className="password-field"
            style={{
              width: '100%',
              position: 'relative',
            }}
          >
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
              sx={{ width: '15%', height: '100%', position: 'absolute', right: 0 }}
              variant="text"
              onClick={() => {
                setShowPassword(!showPassword)
              }}
            >
              Show
            </Button>
          </div>
          <div
            className="phone-field"
            style={{ display: 'flex', justifyContent: 'space-between', width: '100%', gap: '10px' }}
          >
            <Autocomplete
              id="country-select-demo"
              required
              sx={{ width: 250 }}
              options={countries}
              autoHighlight
              value={selectedCountry}
              onChange={(e, newValue) => setSelectedCountry(newValue)}
              getOptionLabel={(option) => `${option.code} (+ ${option.phone})`}
              renderOption={(props, option) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 }, fontSize: '12px' }} {...props}>
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
          <Button variant="contained" fullWidth sx={{ height: '50px' }} onClick={handleRegister}>
            Register
          </Button>
        </Box>
      </Container>
    )
  )
}
