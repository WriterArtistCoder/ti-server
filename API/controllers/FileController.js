const fs =require('fs')
const path = require('path')
const comics = './api/public/comics'

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
    try {
      const query = req.query.name
      console.log(query)
      fs.readdir(comics, (err, files) => {
        if (err) {
          console.log(err)
        }
        if (query) {
          console.log(files)
          let array = files.filter((file) => file.split('.').slice(0, -1).join('.') == query)
          if (array.length > 1) {
            console.log('worked')
            res.send(array)
          } else {
            console.log('didnt work')
            res.send({error: 'The image file does not have a corresponding txt file'})
          }
        } else {
          res.send({ files })
        }
      })
    } catch (error) {
      console.log(error)
    }
  },
}