require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = process.env.PORT
const cors = require('cors')
const router = require('./routes/index')
mongoose.connect('mongodb://localhost:27017/fancyTodo',{useNewUrlParser:true})


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/',router)









app.listen(port,()=>{
    console.log(port)
})
