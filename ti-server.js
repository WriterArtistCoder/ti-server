// Imports
const fs = require('fs');

// Express

const express = require('express');

var app = express();

// Respond to requests

// GET /
app.get('/', function (req, res) {
    console.log('/ path requested');
    
    fs.readFile('docs/ti/index.html', (err, data) => {
        if (err) throw err;

        res.send(data.toString());
    });
});

// GET comic page
app.get(/\/comic\/(\d+)/, function(req, res) {
    res.send(req.url.replace(/\/comic\/(\d+)/, '$1'));
});

// GET any page
app.get(/\/(.+)/, function(req, res) {
    // /\/([a-zA-Z0-9\-]+)/
    console.log(req.url + ' path requested');
    let path = req.url.replace(/\/(.+)/, '$1');
    
    fs.readFile('docs/ti/'+path, (err, data) => {
        if (err) throw err;

        res.send(data.toString());
    });
});

// Start server on port

var server = app.listen(2204, function () {
    console.log('Server started on port: 2204');
});