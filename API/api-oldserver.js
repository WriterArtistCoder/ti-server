// Imports
const fs = require('fs')
const express = require('express')
const cors = require('cors')
const axios = require('axios')
const processor = require('./api-process')
const path = require('path')

// Functions

/**
 * Returns content of a JSON file as a JSON object.
 * @param {String} path The filepath
 */
function getData(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, function (err, data) {
            if (err) reject(err)
            resolve(JSON.parse(data))

        })
    })
}

getPost()

async function getPost() {
    try {
        const auth = await getData(path.join(__dirname, '/auth.json'))

        axios.get(auth.requests.posts)
            .then(response => {
                console.log('API responded successfully! Sending data to client.')

                const resPosts = response.data.items // Create a list of response posts
                posts = []

                // Process each post
                for (var i = 0; i < resPosts.length; i++) {
                    posts.push(processor.fromBlogger(resPosts[i]))
                }

                console.log(posts) // If posts isn't empty
            })
            .catch(err => {
                console.log(err)
            })
    } catch (err) { console.log(err) } // Replace with returning error to client later (ERROR 500)
}

/*
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
})*/