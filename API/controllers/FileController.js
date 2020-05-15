const fs =require('fs')
const path = require('path')

module.exports = {
  async getInfo (req, res) {
    try {
      console.log(__dirname)
      res.status(200).sendFile(__dirname + '/index.html')
    } catch (error) {
      console.log(error)
    }
  },
  async getComics (req, res) {
    res.status(200).send('comics')
  }
}