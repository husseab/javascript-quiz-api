const { createItem, getAllItems, getItemById, updateItem, deleteItem } = require('../controllers/helpers')

const createQuestion = (req, res) => createItem(res, 'question', req.body)

const getAllQuestions = (req, res) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  return getAllItems(res, 'question')
}
const getQuestionByID = (req, res) => {
 res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  return getItemById(res, 'question', req.params.id)
}
const updateQuestion = (req, res) => updateItem(res, 'question', req.body, req.params.id)

const deleteQuestion = (req, res) => deleteItem(res, 'question', req.params.id)

module.exports = {
  createQuestion,
  getAllQuestions,
  getQuestionByID,
  updateQuestion,
  deleteQuestion
}