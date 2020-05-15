// Imports
const fs = require('fs')
const sqlite3 = require('sqlite3').verbose()
const processor = require('../api-process')

var auth
fs.readFile('auth.json', (err, data) => {
    if (err) throw err

    auth = JSON.parse(data.toString())
})

// Functions

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
	})

	return promise
}

// Use SQLite
let db = new sqlite3.Database('./comics.db', (err) => {
    if (err) console.log(err.message)
    console.log('Connected to the comics database.')
})

db.run(`CREATE TABLE IF NOT EXISTS comics
(
    id INTEGER PRIMARY KEY,
    url TEXT UNIQUE,
    date TIMESTAMP,
    title TEXT NOT NULL,
    image TEXT NOT NULL UNIQUE,
    transcript TEXT DEFAULT "",
    caption TEXT DEFAULT ""
)`, (err) => {
    if (err) console.log(err.message)
})

var nextPage = ''
while (true) {
    sendXHR('GET', auth.requests.posts+nextPage).then(function (responseData) {
        console.log('API responded successfully! Sending data to client.')
        const resPosts = JSON.parse(responseData).items // Create a list of response posts
        posts = []

        // Process each post
        for (var i = 0; i < resPosts.length; i++) {
            posts.push(processor.fromBlogger(resPosts[i]))
        }

        console.log('Accessed!')
        console.log(posts[0])

        nextPage = '&nextPageToken='+responseData.nextPageToken
    })

    if (nextPage == null) break
}

db.close((err) => {
    if (err) console.error(err.message)
    
    console.log('Close the database connection.')
})