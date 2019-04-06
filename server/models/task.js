const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TaskSchema = new Schema({
    name:{
        type:String,
        required:[true,'judul tidak boleh kosong']
    },
    description:String,
    status:String,
    dueDate:String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
})

const Task = mongoose.model('Task',TaskSchema)
module.exports = Task