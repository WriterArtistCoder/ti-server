
const FileController = require('./controllers/FileController')
const ComicController = require('./controllers/ComicController')

module.exports = (app) => {
  app.get('/', FileController.getInfo)
  app.get('/comics', ComicController.getComics)
  app.post('/comics', ComicController.createComic)
  app.get('/comics/images', FileController.getComics)
}