const express = require('express')
const AnswerController = require('../controllers/answer')

const router = express.Router()

router.route('/')
  .post(AnswerController.createAnswer)

module.exports = router