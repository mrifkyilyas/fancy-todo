
const router = require('express').Router()
const user = require('./user')
const task = require('./task')
const {User,Task} = require('../controllers')
const {authen} = require('../middleware')
router.post('/register',User.register)
router.post('/login',User.login)
router.post('/google-login',User.googleLogin)
router.use(authen.authen)
router.use('/user',user)
router.use('/task',task)








module.exports = router