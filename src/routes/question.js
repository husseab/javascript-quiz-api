const express = require('express')
const QuestionController = require('../controllers/question')

const router = express.Router()

router.route('/')
  .post(QuestionController.createQuestion)
  .get(QuestionController.getAllQuestions)

router.route('/:id')
  .get(QuestionController.getQuestionByID)
  .patch(QuestionController.updateQuestion)
  .delete(QuestionController.deleteQuestion)

module.exports = router