const { createItem, getAllItems } = require('../controllers/helpers')

const createQuestion = (req, res) => createItem(res, 'question', req.body)

const getAllQuestions = (req, res) => getAllItems(res, 'question')


module.exports = {
  createQuestion,
  getAllQuestions
}