const Comic = require('../models/Comic')
const jwt = require('jsonwebtoken')

function verifyJWT(token) {
  try {
    return jwt.verify(token, config.authentication.jwtSecret)
  } catch (error) {
    return null
  }
}

module.exports = {
  async createComic (req, res) {
    try {
      const decrypted = verifyJWT(req.body.token)
      if (decrypted) {
        const { number, url, date, title, image, transcript, caption } = decrypted
        const comicList = await Comic.find({ $or: [ { url }, { image }, { number } ] })
        if (comicList) {
          res.status(403).send({error: 'Comic already exists'})
        } else {
          const newComic = new Comic({
            number,
            url,
            date,
            title,
            image,
            transcript,
            caption
          })
          newComic.save().then(comic => {
            return res.status(200).send(comic)
          })
        }
      } else {
        res.status(401).send({error: 'Invalid Token'})
      }
    } catch (error) {
      res.status(500).send({error: 'Random Error'})
    }
  },
  async getComics(req, res) {
    try {
      const query = req.query.number
      if (query) {
        let comicList = await Comic.find({ number: query })
        res.status(200).send(comicList)
      } else {
        let comicList = await Comic.find({})
        res.status(200).send(comicList)
      }
    } catch (error) {
      res.status(500).send({error: 'Random Error'})
    }
  }
}