const { Task, User } = require('../models')
const { jwt } = require('../helpers')


class Controller {
    static create(req, res) {
        let decoded = jwt.jwtVerify(req.headers.token)
        Task
            .create({ ...req.body, user: decoded.id })
            .then(success => {
                res.status(201).json('success create')
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static getAllTaskByUser(req, res) {
        let decoded = jwt.jwtVerify(req.headers.token)
        Task
            .find({ user: decoded.id })
            .populate('user')
            .then(task => {
                res.status(200).json(task)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
    
    static deleteTask(req, res) {
        Task
            .findOneAndDelete({
                _id: req.params.id
            })
            .then(task => {
                if (task) {
                    res.status(200).json({
                        message: 'task successfully deleted'
                    })
                } else {
                    res.status(404).json({
                        message: 'task not found'
                    })
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static updateTask(req, res) {
        console.log('masuk')
        Task.
        findOneAndUpdate({
            _id: req.params.id
        }, {
                ...req.body
            }, {
                new: true
            })
            .then(task => {
                console.log(task)
                if (task) {
                    res.status(200).json(task)
                } else {
                    res.status(404).json({
                        message: 'Task not found'
                    })
                }
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    }





}

module.exports = Controller