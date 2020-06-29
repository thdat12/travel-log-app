const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const logs = require('../api/logs')

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true 
})
 
const app = express()

app.use(express.json())
app.use(morgan('common'))
app.use(helmet())
app.use(cors({
  origin: process.env.CORS_ORIGIN
}))

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World'
  })
})

app.use('/api/logs', logs)

app.use((req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl} `)
  res.status(404)
  next(error)
})

app.use((error, req, res, next) => {
  const statusCode = req.statusCode === 200 ? 500 : res.statusCode
  res.status(statusCode)
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? '' : error.stack
  })
})

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Listenning at http://localhost:${port}`))