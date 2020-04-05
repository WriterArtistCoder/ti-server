// Imports
const fs = require('fs')
const express = require('express')
const cors = require('cors')
const https = require('https')
const processor = require('./api-process')

// Set up auth.json
let auth
fs.readFile('auth.json', (err, data) => {
    if (err) throw err

    auth = JSON.parse(data.toString())
})

// Get response page for '/' request
let index
fs.readFile('docs/api/index.html', (err, data) => {
    if (err) throw err

    index = data.toString()
})

// Sends an XMLHTTPRequest
const sendXMLRequest = function (method, url) {
    const promise = new Promise(function (resolve, reject) {
        const xmlRequest = new XMLHttpRequest()
        xmlRequest.open(method, url)
        xmlRequest.responseType = 'json'

        xmlRequest.onload = function () {
            resolve(xmlRequest.response)
        }

        xmlRequest.send()
    })

    return promise
}

// Express
var app = express()

// Respond to requests

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 2204)
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})

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
    https.get(auth.requests.posts, (resp) => {
        let data = ''

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk
        })

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            console.log('API responded successfully! Sending data to client.')
            const resPosts = JSON.parse(data).items // Create a list of response posts
            posts = []

            // Process each post
            for (var i = 0; i < resPosts.length; i++) {
                posts.push(processor.fromBlogger(resPosts[i]))
            }
        })
    }).on('error', (err) => { // If there's an error
        res.status(500).send('Error: ' + err.message)
        console.log('Error: ' + err.message)
        return
    })

    if (posts != null) res.status(200).send(posts) // If posts isn't empty
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