var express = require('express')
var bp = require('body-parser')
var app = express()
var cors = require('cors')
var port = 3000

app.use(cors())
//fire up database connection

require('./server-assets/db/mlab-config')

//register middleware

app.use(bp.json())
app.use(bp.urlencoded({extended: true}))
//code above is always the same

//import routes



//catch all

app.get('*', (req, res, next)=>{
    res.status(404).send({error: 'No matching routes'})
})
app.listen(port, ()=>{
    console.log('server running on port', port)
})