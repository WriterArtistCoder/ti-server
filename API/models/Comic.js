const mongoose = require('mongoose');

const ComicSchema = new mongoose.Schema({
    number: {
      type: Number,
      required: true
    },
    url: {
      type: String,
      default: null
    },
    date: {
      type: Date,
      default: null
    },
    title: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    transcript: {
      type: String,
      default: ""
    },
    caption: {
      type: String,
      default: ""
    }
})

const Comic = mongoose.model('Comic', ComicSchema);

module.exports = Comic;