const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Show = require('../models/show')

mongoose.connect('mongodb://localhost:27017/shows')

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error'))
db.once('open', function(callback) {
  console.log('DB Connection >> Succeeded')
})

const app = express()

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())


app.get('/shows', (req, res) => {
  Show.find({}, 'venue date', function(error, shows) {
    if (error) console.error(error)
    else {
      res.send({
        shows
      })
    }
  }).sort({_id: -1})
})

app.get('/shows/:id', (req, res) => {
  const db = req.db
  Show.findById(req.params.id, 'venue date', function (error, show) {
    if (error) console.error(error)
    else res.send(show)
  })
})

app.put('/shows/:id', (req, res) => {
  const db = req.db
  Show.findById(req.params.id, 'venue date', function (error, show) {
    if (error) console.error(error)
    else {
      show.venue = req.body.venue
      show.date = req.body.date
      show.save(function (error) {
        if (error) console.log(error)
        else res.send({ success: true })
      })
    }
  })
})

app.post('/shows', (req, res) => {
  const db = req.db
  let venue = req.body.venue
  let date = req.body.date

  var new_show = new Show({
    venue: venue,
    date: date
  })

  new_show.save(function(error) {
    if (error) {
      console.log(error)
    } else {
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
