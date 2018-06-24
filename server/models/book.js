const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: String,
  genre: String,
  authorId: String
});

module.exports = mongoose.model('Book', bookSchema);
