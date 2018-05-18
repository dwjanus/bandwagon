const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ShowSchema = new Schema({
  date: Date,
  location: {
    city: String,
    state: String,
  },
  venue: {
    name: String,
    location: String
  },
  bands: String, //this will be an Array later
  description: String,
  link: String
})

const Show = mongoose.model('Show', ShowSchema)
module.exports = Show