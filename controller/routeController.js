// IMPORTS
const path = require('path')
const {nanoid} = require('nanoid')

const HashedURL = require('../models/hashedURL')

// FUNCTION TO GENERATE 7 CHAR ID (WHICH IS NOT IN DATABASE)
const fetchValidId = async () => {
  const id = nanoid().slice(0, 7)
  const data = await HashedURL.findOne({shortURL: id})
  if (!data) return id
  return await fetchValidId()
}

// RENDER HOMEPAGE
const getHomePage = (req, res, next) => {
  res.render('index.ejs', {url: ''})
}

// CREATE A shortURL
const generateShortUrl = async (req, res, next) => {
  const {url, clicks} = req.body
  // create new shortURL
  const id = await fetchValidId()
  const newURL = new HashedURL({
    fullURL: url,
    shortURL: id,
    clicks: clicks ? clicks : -1,
  })
  // add new url to database
  try {
    await newURL.save()
  } catch (error) {
    return next(error)
  }
  // create final short url and return it
  const shortenedURL = path.join(req.headers.origin, id)
  res.render('index.ejs', {url: shortenedURL})
}

// REDIRECTING shortURL TO fullURL
const redirectToUrl = async (req, res, next) => {
  const {id} = req.params
  let data
  // fetch data from database based on shortURL
  try {
    data = await HashedURL.findOne({shortURL: id})
  } catch (error) {
    return next(error)
  }
  // return invalid url if it doesn't exist or max number of clicks is 0
  if (!data || data.clicks === 0) {
    return res.status(404).json({message: 'Invalid URL'})
  }
  // redirect if number of clicks was not set
  if (data.clicks === -1) {
    return res.status(200).redirect(data.fullURL)
  }
  // update number of clicks and redirect
  try {
    await HashedURL.updateOne({shortURL: id}, {clicks: data.clicks - 1})
  } catch (error) {
    return next(error)
  }
  return res.status(200).redirect(data.fullURL)
}

module.exports = {
  getHomePage,
  generateShortUrl,
  redirectToUrl,
}
