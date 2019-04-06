const router = require('express').Router()
const {Task} = require('../controllers')

router.post('/create',Task.create)
router.get('/all',Task.getAllTaskByUser)
router.delete('/:id',Task.deleteTask)
router.put('/:id',Task.updateTask)








module.exports = router