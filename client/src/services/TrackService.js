import Api from '@/services/Api'

export default {
  getTrackDetails (id) {
    return Api().get(`tracks/${id}`)
  }
}
