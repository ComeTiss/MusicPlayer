import axios from 'axios'
import store from '@/store/store'

const TOKEN = store.state.token

export default () => {
  return axios.create({
    baseURL: 'https://api.spotify.com/v1/',
    headers: {'Authorization': 'Bearer ' + TOKEN}
  })
}
