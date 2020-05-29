module.exports = {
  port: null,
  authentication: {
    jwtSecret: process.env.jwtSecret || ''
  }
}
