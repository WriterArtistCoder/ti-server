// Welcome to the ELIJAPI

const config = require('./config/config')
const express = require('express')
const cors = require('cors')
const path = require('path')
const mongodb = require('mongodb')
const mongoose = require('mongoose')

const app = express()

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors()) // Sort of a security risk, disable before building for production
app.use('/public', express.static(__dirname + '/public'))

// Connect to mongo
const db = require('./config/keys').MongoURI

mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err))

require('./routes')(app)

const PORT = process.env.port || config.port
app.listen(PORT)
console.log(`Server started on port ${PORT}`)