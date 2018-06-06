const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const util = require('util')
const Show = require('../models/show')

require('dotenv').config()
const mongo_url = process.env.MONGODB_URI

console.log(`Mongo Url ${mongo_url}`)

mongoose.connect(mongo_url)

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error'))
db.once('open', function(callback) {
  console.log('DB Connection >> Succeeded')
})

const app = express()

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())



// back-end routes for http requests
app.get('/shows', (req, res) => {
  Show.find({}, function(error, shows) {
    if (error) console.error(error)
    else {
      console.log('Shows found:\n' + util.inspect(shows))
      res.send({
        shows
      })
    }
  }).sort({_id: -1})
})

app.get('/shows/:id', (req, res) => {
  const db = req.db
  Show.findById(req.params.id, function (error, show) {
    if (error) console.error(error)
    else res.send(show)
  })
})

app.put('/shows/:id/edit', (req, res) => {
  const db = req.db
  Show.findById(req.params.id, function (error, show) {
    if (error) console.error(error)
    else {
      const updated = req.body 
      show.date.utc = updated.date
      show.date.formatted = updated.formatted
      show.location.city = updated.city
      show.location.state = updated.state
      show.location.venue.name = updated.venue_name
      show.location.venue.address = updated.address
      show.bands = updated.bands
      show.description = updated.description
      show.link = updated.link

      show.save(function (error) {
        if (error) console.log(error)
        else res.send({ success: true })
      })
    }
  })
})

app.post('/shows', (req, res) => {
  const db = req.db

  console.log(`[New Show] >> Request: \n${util.inspect(req.body)}`)

  let new_show = new Show({
    date: {
      utc: req.body.date,
      formatted: req.body.formatted
    },
    location: {
      city: req.body.city || 'TBD',
      state: req.body.state || 'TBD',
      venue: {
        name: req.body.venue_name || 'TBD',
        address: req.body.address || 'unknown'
      }
    }, 
    bands: req.body.bands || 'TBD',
    description: req.body.description || '',
    link: req.body.link || ''
  })

  new_show.save(function(error) {
    if (error) {
      console.log(error)
    } else {
      console.log('Success')
      res.send({
        success: true,
        message: 'Show saved successfully!'
      })
    }
  })
})

app.delete('/shows/:id', (req, res) => {
  const db = req.db
  Show.remove({ _id: req.params.id }, function(err, show) {
    if (err) res.send(err)
    else res.send({ success: true })
  })
})

app.listen(process.env.PORT || 8081)
