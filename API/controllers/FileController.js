
module.exports = {
  async getInfo (req, res) {
    try {
      res.status(200).send({
        ApiName: 'WAC Application',
        version: '1.0.0'
      })
    } catch (error) {
      console.log(error)
    }
  },
  async getComics (req, res) {
    res.status(200).send('comics')
  }
}