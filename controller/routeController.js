const path = require('path')
const {nanoid} = require('nanoid')
const HashedURL = require('../models/hashedURL')

const getHomePage = (req, res) => {
  res.render('index.ejs', {url: ''})
}

const generateShortUrl = async (req, res) => {
  const {url} = req.body
  const id = nanoid().slice(0, 7)
  const newURL = new HashedURL({
    fullURL: url,
    shortURL: id,
  })
  try {
    await newURL.save()
  } catch (error) {
    console.log({error})
  }
  const shortenedURL = path.join(req.headers.origin, id)
  res.render('index.ejs', {url: shortenedURL})
}

const redirectToUrl = async (req, res) => {
  const {id} = req.params
  let data
  try {
    data = await HashedURL.findOne({shortURL: id})
  } catch (error) {
    console.log(error)
  }
  if (!data) return res.status(404).json({message: 'Invalid URL'})
  res.redirect(data.fullURL)
}

module.exports = {
  getHomePage,
  generateShortUrl,
  redirectToUrl,
}
