const express = require('express')

const LogEntry = require('../models/LogEntry')

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const entries = await LogEntry.find()
    res.json(entries)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const logEntry = new LogEntry(req.body)
    await logEntry.save()
    res.json(logEntry)
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(422)
    }
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    await LogEntry.findByIdAndDelete({_id: req.params.id})
    res.json({ message: 'Delete Successfully' })
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const logEntry = await LogEntry.findById(req.params.id)
    res.json(logEntry)
  } catch (error) {
    next(error)
  }
})

router.post('/update/:id', async (req, res, next) => {
  try {
    await LogEntry.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    )
    res.json({message: 'Update Successfully'})
  } catch (error) {
    next(error)
  }
})

module.exports = router