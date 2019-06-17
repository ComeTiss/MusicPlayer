import Api from '@/services/Api'

export default {
  getArtistDetails (id) {
    return Api().get(`artists/${id}`)
  },

  getArtistAlbums (id) {
    return Api().get(`artists/${id}/albums`)
  },

  getArtistTopTracks (id, countryCode) {
    return Api().get(`artists/${id}/top-tracks/?country=${countryCode}`)
  }
}
