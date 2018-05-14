const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ShowSchema = new Schema({
  venue: String,
  date: String
})

const Show = mongoose.model('Show', ShowSchema)
module.exports = Show