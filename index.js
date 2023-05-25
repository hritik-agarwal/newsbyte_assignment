// IMPORTS
const path = require('path')
const express = require('express')

const {PORT} = require('./config')
const router = require('./routes/route')
const dbConnect = require('./config/database')
const errorHandler = require('./middleware/error')

// EXPRESS APP
const app = express()

// MIDDLEWARE
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))
app.use(router)
app.use(errorHandler)

// CONNECT TO DATABASE & StART SERVER
const startServer = async () => {
  try {
    const conn = await dbConnect()
    if (conn) {
      console.log(`MongoDB connected: ${conn.connection.host}`)
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
    }
  } catch (error) {
    console.log(error)
  }
}

startServer()
