const AuthenticationController = require('./controllers/AuthenticationController')
const AlbumController = require('./controllers/AlbumController')

module.exports = (app) => {

  app.post('/register', AuthenticationController.register)
  app.post('/login', AuthenticationController.login)

  app.get('/liked-albums/:userId', AlbumController.getUserLikedAlbums)
  app.post('/liked-albums', AlbumController.likeAlbum)
  app.delete('/liked-albums', AlbumController.unLikeAlbum)

}
