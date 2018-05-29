var router = require('express').Router()
var Playlist = require('../models/playlist')
//var Users = require('../models/user')
//var sessions = require('../auth/session')


                            //? says id is optional 
router.get('/api/playlists/:id?', (req, res) => {
    //if passed id, find by id
    if (req.params.id) {
        Playlist.findById(req.params.id)
            .then(playlist => {
                res.send(playlist)
        })
            .catch(err=>{
                return res.status(404).send({'error': 'No playlist at that Id'})
            })
    }
    //if no id find all
    Playlist.find({})
    .then(playlists => {
        return res.send(playlists)
})
    .catch(err=>{
        return res.status(404).send({'error': err})
    })
})

//creates new playlist
router.post('/api/playlists', (req, res) => {
                  //req.body = title and song
    Playlist.create(req.body)
    .then(newPlaylist => {
        return res.send(newPlaylist)
    })
    .catch(err=>{
        return res.status(400).send(err)
    })
})

//adds a single song - req.body will be a single song object
router.put('/api/playlists/:id/songs', (req, res) => {
    Playlist.findById(req.params.id)
    .then(function(playlist){
        playlist.songs.addToSet(req.body)
        playlist.save()
    })
    .catch(err=>{
        res.status(400).send(err)
    })
})

//update entire song array from entire playlist
router.put('/api/playlists/:id', (req, res) => {
    Playlist.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(playlist => {
        res.send(playlist)
    })
    .catch(err=>{
        res.status(400).send(err)
    })
})

router.delete('/api/playlists/:id', (req, res) => {
    Playlist.findByIdAndRemove(req.params.id)
    .then(oldPlaylist => {
        res.send("Successfully Deleted Song")
    })
    .catch(err => {
        res.status(400).send(err)
    })
})

module.exports = {router} //sends info to index.js

