const { Task, User } = require('../models')
const { bcrypt, jwt } = require('../helpers')
// console.log(require('../helpers'))
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
                if (found && bcrypt.comparePassword(req.body.password,found.password)) {
                    let token = jwt.jwtSign({
                        id: found.id,
                        email:found.email
                    })
                    
                    res.status(200).json({
                        id: found.id,
                        name: found.name,
                        email: found.email,
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



}

module.exports = Controller