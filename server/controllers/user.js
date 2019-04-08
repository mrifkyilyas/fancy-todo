const { Task, User } = require('../models')
const { bcrypt, jwt } = require('../helpers')
const { OAuth2Client } = require('google-auth-library')
const CLIENT_ID = "279578333779-le6son4i7oepdkjvllnsvca5k1ste2va.apps.googleusercontent.com"
const client = new OAuth2Client(CLIENT_ID)
class Controller {
    static register(req, res) {
        User.create({
            ...req.body,
            role: 'member'
        })
            .then(success => {
                res.status(201).json('success')
            })
            .catch(err => {
                res.status(500).json({
                    err: err.message
                })
            })
    }

    static login(req, res) {
        User.findOne({
            email: req.body.email
        })
            .then(found => {
                // console.log(req.body.password)
                console.log(found)
                if (found && bcrypt.comparePassword(req.body.password, found.password)) {
                    let token = jwt.jwtSign({
                        id: found._id,
                        email: found.email
                    })
                    console.log(token)
                    

                    res.status(200).json({
                        // id: found.id,
                        // name: found.name,
                        // email: found.email,
                        token: token
                    })

                } else {
                    console.log('tau')
                    res.status(400).json({
                        message: 'password yang anda masukan salah'
                    })
                }

            })
            .catch(err => {
                res.status(500).json('salah')
            })
    }

    static googleLogin(req, res) {
        console.log('masuk')
        client
            .verifyIdToken({
                idToken: req.body.token,
                audience: CLIENT_ID
            })
            .then(ticket => {
                let payload = ticket.getPayload()
                return Promise.all([User
                    .findOne({
                        email: payload.email
                    }), payload
                ])
            })
            .then(([user, payload]) => {
                if (!user) {
                    console.log('akun baru')
                    // console.log(payload,'ini payload')
                    return User
                        .create({
                            name: payload.name,
                            email: payload.email,
                            password: `lalala`,
                        })

                } else {
                    console.log('udah ada')
                    return user
                }
            })
            .then(user => {
                const token = jwt.jwtSign({
                    id: user._id,
                    email:user.email
                })
                console.log(token)

                res.status(200).json({
                    token: token
                })
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }



}

module.exports = Controller