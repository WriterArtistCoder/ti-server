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
  async createUser (req, res) {
    // Finish later!
  }
}