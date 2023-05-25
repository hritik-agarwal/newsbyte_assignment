const express = require('express')
const {getHomePage, generateShortUrl, redirectToUrl} = require('../controller/routeController')
const router = express.Router()

router.get('/', getHomePage)
router.post('/', generateShortUrl)
router.get('/:id', redirectToUrl)

module.exports = router
