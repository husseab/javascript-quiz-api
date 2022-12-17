const { expect } = require('chai')
const request = require('supertest')
const { Question } = require('../src/models')
const app = require('../src/app')

describe.only('/questions', () => {
  before(async () => Question.sequelize.sync())

  beforeEach(async () => {
    await Question.destroy({ where: {} })
  })

  describe('with no records in the database', () => {
    describe('POST /questions', () => {
      it('creates a new question in the database', async () => {
        const response = await request(app).post('/questions').send({
          question: 'New Question'
        })
        const newQuestionRecord = await Question.findByPk(response.body.id, {
          raw: true
        })

        expect(response.status).to.equal(201)
        expect(response.body.question).to.equal('New Question')
        expect(newQuestionRecord.question).to.equal('New Question')
      })
      it('does not create a new question in the database--no text', async () => {
        const response = await request(app).post('/questions').send({
          question: ""
        })
        const newQuestionRecord = await Question.findByPk(response.body.id, {
          raw: true
        })

        expect(response.status).to.equal(404)
        expect(newQuestionRecord).to.equal(null)
        expect(response.body.errors.toString()).to.equal('Question cannot be empty')
      })
      it('does not create a new question in the database--NULL', async () => {
        const response = await request(app).post('/questions').send({
          question: null
        })
        const newQuestionRecord = await Question.findByPk(response.body.id, {
          raw: true
        })
        
        expect(response.status).to.equal(404)
        expect(newQuestionRecord).to.equal(null)
        expect(response.body.errors.toString()).to.equal('Question cannot be null')
      })
    })
  })
})