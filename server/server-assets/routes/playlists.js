var router = require('express').Router()
var Playlists = require('../models/playlist')
var Users = require('../models/user')
//var sessions = require('../auth/session')

router.get('/api/playlists', (req, res, next) => {
    Playlists.find({})
    .then(playlists => {
        res.status(200).send(playlists)
    })
    .catch(err => {
        res.status(400).send(err)
    })
})

router.get('/api/playlists/:id', (req, res, next) => {
    if (!req.params.listId) {
        Playlists.find({}).then(playlists => {
            res.send(playlists)
        })
    }else{
        Playlists.findById(req.params.playlistId).then(playlist => {
            res.send(playlist)
        })
    }
})

router.post('/api/playlists', (req, res, next) => {
    Playlists.create(req.body).then(playlist => {
        res.send(playlist)
    })
})

router.post('/api/playlists/:id', (req, res, next) => {
    Playlists.findByIdAndUpdate(req.params.playlistId, req.body).then(playlist => {
        res.send(playlist)
    })
})

router.put('/api/playlists/:id/songs', (req, res, next) => {
    Playlists.findById(req.params.playlistId).then(playlist => {
        playlist.songs.$addToSet(req.body)
        playlist.save()
        .then(() => {
            res.send(playlist)
        })
    })
})

router.delete('/api/playlists/:id', (req, res, next) => {
    Playlists.findByIdAndRemove(req.params.id)
    .then(data => {
        res.send("Successfully Deleted Song")
    })
    .catch(err => {
        res.status(400).send(err)
    })
})

module.exports = {
    router
}

