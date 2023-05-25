const mongoose = require('mongoose')
const {MONGO_URI} = require('.')

const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI)
    console.log(`MongoDB connected: ${conn.connection.host}`)
  } catch (error) {
    console.log({error})
  }
}

module.exports = dbConnect
