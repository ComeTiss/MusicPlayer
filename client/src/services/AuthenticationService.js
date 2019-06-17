import config from '@/config/config'
import ServerAPI from '@/services/ServerAPI'

export default {
  register (credentials) {
    return ServerAPI().post('register', credentials)
  },
  login (credentials) {
    return ServerAPI().post('login', credentials)
  },
  getToken () {
    window.location = config.baseURL +
      `?client_id=${config.clientId}` +
      `&response_type=${config.responseType}` +
      `&redirect_uri=${config.redirectUri}`
  }
}
