// Imports
const fs = require('fs')
const express = require('express')
const cors = require('cors')
const axios = require('axios')
const processor = require('./api-process')
const path = require('path')

var jsonFile = path.join(__dirname, '/posts.json')

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

// WARNING: This code is really buggy and repeats itself over and over again...
// But it works :)
// Fix later

// FIX FOR COMICS 51, 82, 90, 96, 103
getPosts().then((data) => {
    fs.writeFileSync(path.join(__dirname, '/comics.json'), JSON.stringify(data))
})

/**
 * Gets and processes all posts from a JSON file downloaded from the Blogger v3 API.
 * @returns All posts as a JSON object
 */
async function getPosts() {
    if (jsonFile == '<INSERT FILEPATH HERE>') console.log('Error: Insert filepath in the config variable jsonFile at Line 9')

    var file = await getData(jsonFile)
    var posts = []

    for (var i = 0; i < file.items.length; i++) {
        posts.push(processor.fromBlogger(file.items[i]))
        console.log(i)
    }

    return posts
}