
const FileController = require('./controllers/FileController')

module.exports = (app) => {
  app.get('/api/info', FileController.getInfo)
  app.get('/api/images', FileController.getComics)
}