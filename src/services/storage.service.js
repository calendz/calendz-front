const TOKEN_KEY = 'accessToken'

const TokenService = {
  getToken: () => {
    return localStorage.getItem(TOKEN_KEY)
  },

  setToken: (accessToken) => {
    localStorage.setItem(TOKEN_KEY, accessToken)
  },

  removeToken: () => {
    localStorage.removeItem(TOKEN_KEY)
  }
}

export default TokenService

export { TokenService }
