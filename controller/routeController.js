const path = require('path')
const {nanoid} = require('nanoid')
const HashedURL = require('../models/hashedURL')

const fetchValidId = async () => {
  const id = nanoid().slice(0, 7)
  const data = await HashedURL.findOne({shortURL: id})
  if (!data) return id
  return await fetchValidId()
}

const getHomePage = (req, res) => {
  res.render('index.ejs', {url: ''})
}

const generateShortUrl = async (req, res) => {
  const {url, clicks} = req.body
  const id = await fetchValidId()
  const newURL = new HashedURL({
    fullURL: url,
    shortURL: id,
    clicks: clicks ? clicks : -1,
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
  if (!data || data.clicks === 0) {
    return res.status(404).json({message: 'Invalid URL'})
  }
  if (data.clicks === -1) {
    return res.status(200).redirect(data.fullURL)
  }
  try {
    await HashedURL.updateOne({shortURL: id}, {clicks: data.clicks - 1})
    return res.status(200).redirect(data.fullURL)
  } catch (error) {
    console.log(error)
  }
  res.status(404).json({message: 'Invalid URL'})
}

module.exports = {
  getHomePage,
  generateShortUrl,
  redirectToUrl,
}
