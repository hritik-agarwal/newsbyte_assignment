// IMPORTS
const mongoose = require('mongoose')

// CREATING SCHEMA FOR 'hashed-url' COLLECTION
const hashedURLSchema = new mongoose.Schema(
  {
    shortURL: {type: String, required: true},
    fullURL: {type: String, required: true},
    clicks: {type: Number},
  },
  {timestamps: true}
)

// CREATING MODEL FOR 'hashed-url' COLLECTION
const HashedURL = mongoose.model('HashedURL', hashedURLSchema, 'hashed_url')

module.exports = HashedURL
