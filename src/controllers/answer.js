const { createItem, getAllItems, getItemById, updateItem, deleteItem } = require('../controllers/helpers')

const createAnswer = (req, res) => createItem(res, 'answer', req.body)

const getAllAnswers = (req, res) => { 
  res.set('Access-Control-Allow-Origin', '*');
  return  getAllItems(res, 'answer')
}
const getAnswerByID = (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  return getItemById(res, 'answer', req.params.id)
}
const updateAnswer = (req, res) => updateItem(res, 'answer', req.body, req.params.id)

const deleteAnswer = (req, res) => deleteItem(res, 'answer', req.params.id)

module.exports = {
  createAnswer,
  getAllAnswers,
  getAnswerByID,
  updateAnswer,
  deleteAnswer
}
