const Sequelize = require('sequelize')
const QuestionModel = require('./question');
const AnswerModel = require('./answer');

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, NODE_ENV } = process.env

const setupDatabase = () => {
  const connection = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: NODE_ENV === 'production' ? 'postgres' : 'mysql',
    logging: false
  })
const Question = QuestionModel(connection, Sequelize)
const Answer = AnswerModel(connection, Sequelize)

Question.hasMany(Answer)
Answer.belongsTo(Question)

  connection.sync({ alter: true })
  return {
Question,
Answer
  }
}

module.exports = setupDatabase()