// Welcome to the ELIJAPI
const express = require('express');
const cors = require('cors');
const path = require('path')

const app = express()

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors()) // Sort of a security risk, disable before building for production
app.use('/public', express.static(__dirname + '/public'));


require('./routes')(app)

const PORT = process.env.port || 8080 // HEROKU PORT / DEV PORT
app.listen(PORT)
console.log(`Server started on port ${PORT}`)