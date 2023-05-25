const path = require('path')
const express = require('express')
const {PORT} = require('./config')
const dbConnect = require('./config/database')
const router = require('./routes/route')

const app = express()

// middlewares
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))
app.use(router)

dbConnect()
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
