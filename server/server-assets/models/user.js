var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId
var bcrypt = require('bcryptjs')
const SALT = 10

var schemaName = 'User'

var schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, dropDups: true },
    password: { type: String, required: true }
  })

  schema.statics.generateHash = function (password) {
    return bcrypt.hashSync(password, SALT)
  }
  
  schema.methods.validatePassword = function (password) {
    return bcrypt.compare(password, this.password)
  }

  module.exports = mongoose.model('User', schema)