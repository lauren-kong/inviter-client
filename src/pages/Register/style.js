const RegisterStyles = {
  container: {
    width: '500px',
    height: '80vh',
    padding: '40px',
    marginTop: '30px',
  },
  titleBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
  },
  nameBox: {
    display: 'flex',
    flexDirection: {
      mobile: 'column',
      laptop: 'row',
    },
    justifyContent: {
      laptop: 'space-between',
    },
    gap: {
      mobile: '20px',
      laptop: '0',
    },

    width: '100%',
  },
  firstname: {
    width: {
      mobile: '100%',
      laptop: '45%',
    },
  },
  lastname: {
    width: {
      mobile: '100%',
      laptop: '45%',
    },
  },
  passwordDiv: {
    width: '100%',
    position: 'relative',
  },
  pwdShowButton: {
    width: '15%',
    height: '100%',
    position: 'absolute',
    right: 0,
  },
  mobileDiv: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    gap: '10px',
  },
  countrySelect: {
    width: 250,
  },
  countryList: {
    '& > img': { mr: 2, flexShrink: 0 },
    fontSize: '12px',
  },
}

export default RegisterStyles
