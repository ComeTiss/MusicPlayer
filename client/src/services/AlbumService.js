import Api from '@/services/Api'
import ServerAPI from '@/services/ServerAPI'

export default {
  getAlbumDetails (id) {
    return Api().get(`albums/${id}`)
  },
  getAlbumTracks (id) {
    return Api().get(`albums/${id}/tracks`)
  },
  likeAlbum (userId, albumId) {
    return ServerAPI().post('liked-albums', {
      userId: userId,
      albumId: albumId
    })
  },
  unLikeAlbum (userId, albumId) {
    return ServerAPI().delete('liked-albums', {
      data: {
        userId: userId,
        albumId: albumId
      }
    })
  },
  getUserLikedAlbums (userId) {
    return ServerAPI().get(`liked-albums/${userId}`)
  }
}
