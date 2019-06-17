import Api from '@/services/Api'

export default {
  getAlbumDetails (id) {
    return Api().get(`albums/${id}`)
  },

  getAlbumTracks (id) {
    return Api().get(`albums/${id}/tracks`)
  }
}
