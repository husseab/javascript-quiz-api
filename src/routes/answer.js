const express = require('express')
const AnswerController = require('../controllers/answer')

const router = express.Router()

router.route('/')
  .post(AnswerController.createAnswer)
  .get(AnswerController.getAllAnswers)

router.route('/:id')
  .get(AnswerController.getAnswerByID)
  .patch(AnswerController.updateAnswer)
  .delete(AnswerController.deleteAnswer)

module.exports = router
