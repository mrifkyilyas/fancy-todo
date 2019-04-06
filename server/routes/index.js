
const router = require('express').Router()
const user = require('./user')
const task = require('./task')
const {User,Task} = require('../controllers')
router.use('/user',user)
router.use('/task',task)
router.post('/register',User.register)
router.post('/login',User.login)







module.exports = router