var mongoose = require('mongoose')
var Schema = mongoose.Schema
//var ObjectId = Schema.Types.ObjectId

var schemaName = 'Playlist'

var songSchema = new Schema({
    title: {type: String, required: true},
    albumArt: {type: String, required: true},
    artist: {type: String, required: true},  //don't need seperate model for songSchema
    album: {type: String, required: true},
    preview: {type: String, required: true},
    price: {type: String, required: true},
})

var playlist = new Schema({
    title: {type: String, required: true},
    songs: [songSchema]       //schema inside schema to enforce all properties
})

playlist.pre('save', function(next){  //will mark it as always changed so it saves in case it doesn't catch it
    this.markModified('songs')
    next()
})

module.exports = mongoose.model(schemaName, playlist)