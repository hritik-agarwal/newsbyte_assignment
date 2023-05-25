// IMPORT
const express = require('express')

// ROUTER
const router = express.Router()

// CONTROLLER
const {
  getHomePage,
  generateShortUrl,
  redirectToUrl,
} = require('../controller/routeController')

// ROUTES
router.get('/', getHomePage)
router.post('/', generateShortUrl)
router.get('/:id', redirectToUrl)

module.exports = router
