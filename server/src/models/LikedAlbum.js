
module.exports = (sequelize, DataType) => {
  const LikedAlbum = sequelize.define('LikedAlbum', {
    userId: DataType.INTEGER,
    albumId: DataType.STRING
  })

  return LikedAlbum
}
