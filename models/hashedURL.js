const mongoose = require('mongoose')

const hashedURLSchema = new mongoose.Schema(
  {
    shortURL: {
      type: String,
      required: true,
    },
    fullURL: {
      type: String,
      required: true,
    },
    clicks: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
)

const HashedURL = mongoose.model('HashedURL', hashedURLSchema, 'hashed_url')
module.exports = HashedURL
