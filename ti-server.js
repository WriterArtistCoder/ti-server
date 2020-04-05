// Imports
const fs = require('fs')
const express = require('express')
const mime = require('mime')

// Respond to requests
var app = express()

// GET image from website
app.get(/\/images\/.+/gm, function (req, res) {
    const fileExt = req.url.replace(/^[^.]+\.(.+)$/gm, '$1')
    const header = mime.getType(fileExt)

    res.setHeader('Content-Type', `${header}; charset=UTF-8`)
    res.sendFile(`C://Users/sodal/git/ti-server/docs/ti${req.url}`)

    console.log(`${req.url} path requested | Path: images | Content-Type: ${header} | TIME: ${new Date().getTime()}`)
})

// GET a file from website
app.get(/\/.+/gm, function (req, res) {
    if (!req.url.startsWith('/images')) {
        var contents = fs.readFileSync(`docs/ti${req.url}`, 'utf8')

        const fileExt = req.url.replace(/^[^.]+\.(.+)$/gm, '$1')
        const header = mime.getType(fileExt)

        res.setHeader('Content-Type', `${header}; charset=UTF-8`)
        res.send(contents)

        console.log(`${req.url} path requested | Path: general | Content-Type: ${header} | TIME: ${new Date().getTime()}`)
    }
})

// Start server on port

var server = app.listen(2204, function () {
    console.log('Server started on port: 2204')
})