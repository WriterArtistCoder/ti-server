// Imports
const fs = require('fs');

// Express

const express = require('express');

var app = express();

// Respond to requests

// GET Tiny Stripz website
app.use(express.static('docs/ti'));

// GET comic page
app.get(/\/comic\/(\d+)/, function(req, res) {
    res.send(req.url.replace(/\/comic\/(\d+)/, '$1'));
});

// Start server on port

var server = app.listen(2204, function () {
    console.log('Server started on port: 2204');
});