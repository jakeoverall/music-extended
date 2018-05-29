// var router = require('express').Router()
// var Users = require('../models/user')
// var users = []
// // Get all
// router.get('/api/users', (req, res, next)=>{
//     Users.find(req.query)
//     .then(users=>{
//         res.status(200).send(users)
//     })
//         .catch(err =>{
//             res.status(400).send(err)
//         })
// })

// router.get('/api/users/:id', (req, res, next)=>{
//     Users.findById(req.params.id)
//     .then(users=>{
//         res.status(200).send(users)
//     })
//         .catch(err =>{
//             res.status(400).send(err)
//         })
// })

// router.post('/api/users/byname/:name', (req, res, next)=>{
//     Users.findOne({name: req.params.name})
//     .then(user=>{
//         res.status(200).send(user)
//     })
//         .catch(err =>{
//             res.status(400).send(err)
//         })
// })

// router.post('/api/users', (req, res, next)=>{
//     var user = req.body
//     Users.create(user)
//     .then(newUser=>{
//         res.status(200).send(newUser)
//     })
//         .catch(err =>{
//             res.status(400).send(err)
//         })
// })

// // edit
// router.put('/api/users/:id', (req, res, next)=>{
//     Users.findByIdAndUpdate(req.params.id, req.body, {new: true})
//     .then(user=>{
//         res.status(200).send({message: "Successfully Updated!", user})
//     })
//         .catch(err =>{
//             res.status(400).send(err)
//         })
// })

// // delete
// router.delete('/api/users/:id', (req, res, next)=>{
//     Users.findByIdAndRemove(req.params.id)
//     .then(data=>{
//         res.send({message: "Successfully Deleted!"})
//     })
//         .catch(err =>{
//             res.status(400).send(err)
//         })
// })

// module.exports = {
//     router
// }