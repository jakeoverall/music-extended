var mongoose = require('mongoose')
var connectionString = 'mongodb://student:student@ds135540.mlab.com:35540/music'
                                //change user and password
var connection = mongoose.connection


mongoose.connect(connectionString) //where connection will be live 

connection.on('error', err=>{
  console.log('ERROR FROM DATABASE: ', err) //listen for errors and display if found
})


connection.once('open', ()=>{
  console.log('Connected to Database') //once connection is made display connected
})