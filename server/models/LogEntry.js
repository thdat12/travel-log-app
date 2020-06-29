const mongoose = require('mongoose')

const { Schema } = mongoose

const LogEntrySchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  comments: String,
  image: String,
  rating: {
    type: Number,
    min: 0,
    max: 10,
    default: 0
  },
  latitude: {
    type: Number,
    min: -90,
    max: 90,
    required: true
  },
  longitude: {
    type: Number,
    min: -180,
    max: 180,
    required: true
  },
  visitDate: {
    type: Date,
    required: true
  }
  
}, { timestamps: true })

const LogEntry = mongoose.model("LogEntry", LogEntrySchema)

module.exports = LogEntry