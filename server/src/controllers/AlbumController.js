const {LikedAlbum} = require('../models')

module.exports = {
    async getUserLikedAlbums (req, res) {
        try {
            const albums = await LikedAlbum.findAll({
                where: {
                    userId: req.params.userId
                }
            })
            res.send(albums)
        }  catch (err) {
            res.status(400).send({
                error: 'Failed to retrieve user albums.'
            })
        }
    },

    async likeAlbum (req, res) {
        try {
            const album = await LikedAlbum.create(req.body)
            res.send(album)
        }  catch (err) {
            res.status(400).send({
                error: 'Failed to like album.'
            })
        }
    },

    async unLikeAlbum (req, res) {
        try {
            console.log("==========")
            console.log(req.body)
            await LikedAlbum.destroy ({
                where: {
                    userId: req.body.userId,
                    albumId: req.body.albumId
                }
            })
            res.send('Album successfully unliked')
        }  catch (err) {
            res.status(400).send({
                error: 'Failed to unlike album.'
            })
        }
    }
};
