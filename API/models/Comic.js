const mongoose = require('mongoose');

const ComicSchema = new mongoose.Schema({
    number: {
      type: number,
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
});

// CREATE TABLE IF NOT EXISTS comics
// (
//   id INTEGER PRIMARY KEY,
//   url TEXT UNIQUE,
//   date TIMESTAMP,
//   title TEXT NOT NULL,
//   image TEXT NOT NULL UNIQUE,
//   transcript TEXT DEFAULT "",
//   caption TEXT DEFAULT ""
// )

const Comic = mongoose.model('Comic', ComicSchema);

module.exports = Comic;