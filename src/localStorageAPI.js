const { REACT_APP_TOKEN_NAME:TOKEN_NAME, REACT_APP_THEME_NAME:THEME_NAME } = process.env

// token & theme storage ------------------------
const setAuthToken = (token) => {
  localStorage.setItem(TOKEN_NAME, token)
}

const getAuthToken = () => {
  return localStorage.getItem(TOKEN_NAME) || ''
}

const setTheme = (theme) => {
  localStorage.setItem(THEME_NAME, theme)
}

const getTheme = () => {
  return localStorage.getItem(THEME_NAME) || 'light'
}

export { setAuthToken, getAuthToken, setTheme, getTheme }