// Imports
const fs = require('fs')
const express = require('express')
const cors = require('cors')
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest
const processor = require('./api-process')

// Set up auth.json
var auth
fs.readFile('auth.json', (err, data) => {
    if (err) throw err

    auth = JSON.parse(data.toString())
})

// Get response page for '/' request
var index
fs.readFile('docs/api/index.html', (err, data) => {
    if (err) throw err

    index = data.toString()
})

/**
 * Sends an XML request.
 * 
 * @param {*} method Request method (e.g. GET, POST)
 * @param {*} url URL to request
 * @param {*} data Data to send (optional)
 */
const sendXHR = function (method, url, data) {
    const promise = new Promise(function (resolve, reject) {
        const xmlRequest = new XMLHttpRequest()
        xmlRequest.open(method, url)
        xmlRequest.responseType = 'json'

        if (data) {
            xmlRequest.setRequestHeader('Content-Type', 'application/json')
        }

        xmlRequest.onload = function () {
            resolve(xmlRequest.response)
        }

        xmlRequest.send(JSON.stringify(data))
    }).catch(err => { throw err; })

    return promise
}

// Add middleware
var app = express()
app.use(cors({
    origin: function (origin, callback) { // Allow all CORS requests
        return callback(null, true)
    }
}))

// Respond to requests

// GET /
app.get('/', cors(), function (req, res) {
    console.log('/ path requested | TIME: ' + new Date().getTime())
    res.status(200).send(index)
})

// GET /posts
app.get('/posts', cors(), function (req, res) {
    console.log('/posts path requested | TIME: ' + new Date().getTime())

    var posts = null

    // GET latest post
    var responseData = sendXHR('GET', auth.requests.posts).then(function (responseData) {
        console.log('BELOW:')
        console.log(responseData)
        console.log('API responded successfully! Sending data to client.')
    
        const resPosts = JSON.parse(responseData).items // Create a list of response posts
        posts = []
    
        // Process each post
        for (var i = 0; i < resPosts.length; i++) {
            posts.push(processor.fromBlogger(resPosts[i]))
        }
    
        res.status(200).send(posts) // If posts isn't empty
    })
})

// GET /posts/latest
app.get('/posts/latest', cors(), function (req, res) {
    console.log(`/posts/latest path requested | TIME: ${new Date().getTime()}`)

    var post = null

    // GET latest post
    https.get(auth.requests.posts, (resp) => {
        let data = ''

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk
        })

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            console.log('API responded successfully! Sending data to client.')
            const resPost = JSON.parse(data).items[0] // Create a list of response posts

            if (resPost != null) { // If post isn't empty
                // Process post
                console.log(resPost.content)
                post = processor.fromBlogger(resPost)

                res.status(200).send(post)
            }
        })
    }).on('error', (err) => { // If there's an error
        res.status(500).send('Error: ' + err.message)
        console.log('Error: ' + err.message)
        return
    })
})

// Start server on port

var server = app.listen(2205, function () {
    console.log('Server started on port: 2205')
})