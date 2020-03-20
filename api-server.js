// Imports
const fs = require('fs');
const https = require('https');
const express = require('express');

// Set up auth.json
let auth;
fs.readFile('auth.json', (err, data) => {
    if (err) throw err;

    auth = JSON.parse(data.toString());
});

// Get response page for '/' request
let index;
fs.readFile('docs/api/index.html', (err, data) => {
    if (err) throw err;

    index = data.toString();
});

// Express
var app = express();

// Respond to requests

// GET /
app.get('/', function (req, res) {
    console.log('/ path requested');
    res.send(index);
});

// GET /posts
app.get('/posts', function (req, res) {
    console.log('/posts path requested');

    // GET list of posts
    https.get(auth.requests.posts, (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            console.log('API responded successfully! Sending data to client.');
            res.send(JSON.parse(data).items);
        });

    }).on('error', (err) => {
        res.send('Error: ' + err.message);
        console.log('Error: ' + err.message);
    });
});

// GET /posts/latest
app.get('/posts/latest', function (req, res) {
    console.log('/posts/latest path requested');

    // GET latest post
    https.get(auth.requests.posts, (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            console.log('API responded successfully! Sending data to client.');
            res.send(JSON.parse(data).items[0]);
        });

    }).on('error', (err) => {
        res.send('Error: ' + err.message);
        console.log('Error: ' + err.message);
    });
});

// Start server on port

var server = app.listen(2205, function () {
    console.log('Server started on port: 2205');
});