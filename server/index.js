var express = require('express')
var bp = require('body-parser')
var app = express()
var cors = require('cors')
var port = 3000

app.use(cors())

//Fire up database connection

require('./server-assets/db/mlab-config')

//register middleware

app.use(bp.json())
app.use(bp.urlencoded({extended: true}))

//code above is always the same


//let auth = require('./server-assets/auth/routes')
//app.use(auth.router)
//app.use(auth.session)

///gate keeper must login to access any route below this code

// app.use((req, res, next) => {
//     if (!req.session.uid) {
//         return res.status(401).send({
//             error: 'please login to continue'
//         })
//     }
//     next()
// })


//import routes

var playlist = require('./server-assets/routes/playlists')

app.use(playlist.router)

//catch all

app.get('*', (req, res, next)=>{
    res.status(404).send({error: 'No matching routes'})
})

app.listen(port, ()=>{
    console.log('server running on port', port)
})