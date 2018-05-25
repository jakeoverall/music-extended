let router = require('express').Router();
let Users = require('../models/user');
let session = require('./session')

let loginError = new Error('Bad Email or Password')

router.post('/register', (req, res) => {
    if (req.body.password.length < 5) {
        return res.status(400).send({
            error: 'Password must be at least 6 characters'
        })
    }
    req.body.password = Users.generateHash(req.body.password)
    Users.create(req.body)
        .then(user => {
            delete user._doc.password
            req.session.uid = user._id
            res.send(user)
        })
        .catch(err => {
            res.status(400).send(err)
        })
})

router.post('/login', (req, res) => {
    Users.findOne({ email: req.body.email })
        .then(user => {
            user.validatePassword(req.body.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).send({ error: 'Invalid Email or Password' })
                    }
                    req.session.uid = user._id;
                    user.password = null
                    delete user.password
                    res.send({
                        message: 'successfully logged in',
                        data: user
                    })
                })
                .catch(err => {
                    res.status(401).send({ mesage: 'Invalid Email or Password' })
                })
        })
        .catch(err => {
            res.status(401).send({
                error: err,
                message: 'Invalid Email or Password'
            })
        })
})
router.delete('/logout', (req, res) => {
    req.session.destroy(() => {
        res.send({
            message: 'You have successfully been logged out. Please come back soon!'
        })

    })
})

router.get('/authenticate', (req, res) => {
    Users.findById(req.session.uid)
      .then(user => {
        if (!user) {
          return res.status(401).send({
            error: 'Please login to continue'
          })
        }
        delete user._doc.password
        res.send(user)
      }).catch(err => {
        res.status(500).send(err)
      })
  })

module.exports = {
    router,
    session
}