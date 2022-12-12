const express = require('express')
const answerModel = require('./routes/answer')

const app = express()

app.use(express.json())

app.get('/', (_, res) => {
  res.status(200).json({ result: 'Welcome to the Back End API for javascript quiz app!' })
})

app.use('/answers', answerModel)

module.exports = app