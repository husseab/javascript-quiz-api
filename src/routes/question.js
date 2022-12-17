const express = require('express')
const QuestionController = require('../controllers/question')

const router = express.Router()

router.route('/')
  .post(QuestionController.createQuestion)


module.exports = router