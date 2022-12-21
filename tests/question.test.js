const { expect } = require('chai')
const request = require('supertest')
const { Question } = require('../src/models')
const app = require('../src/app')

describe('/questions', () => {
  before(async () => Question.sequelize.sync())

  beforeEach(async () => {
    await Question.destroy({ where: {} })
  })

  describe('with no records in the database', () => {
    describe('POST /questions', () => {
      it('creates a new question in the database', async () => {
        const response = await request(app).post('/questions').send({
          question: 'New Question',
          topic: 'frontend question'
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
          question: "",
          topic: 'frontend question'
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
          question: null,
          topic: 'frontend question'
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
  describe('with records in the database', () => {
    let questions

    beforeEach(async () => {
      questions = await Promise.all([
        Question.create({
          question: 'newQuestion1',
          topic: 'frontend question1'
        }),
        Question.create({
            question: 'newQuestion2',
            topic: 'frontend question2'
          }),
          Question.create({
            question: 'newQuestion3',
            topic: 'frontend question3'
          })
      ])
    })

    describe('GET /questions', () => {
      it('gets all question records', async () => {
        const response = await request(app).get('/questions')
        expect(response.status).to.equal(200)
        expect(response.body.length).to.equal(3)
  
        response.body.forEach((questionItem) => {
          const expected = questions.find((a) => a.id === questionItem.id)
  
          expect(questionItem.question).to.equal(expected.question)
        })
      })
    })

    describe('GET /questions/:id', () => {
      it('gets question record by id', async () => {
        const questionItem = questions[0]
        const response = await request(app).get(`/questions/${questionItem.id}`)
        expect(response.status).to.equal(200)
        expect(response.body.question).to.equal(questionItem.question)
      })

      it('returns a 404 if the question does not exist', async () => {
        const response = await request(app).get('/questions/12345')

        expect(response.status).to.equal(404)
        expect(response.body.error).to.equal('The question could not be found.')
      })
    })

    describe('PATCH /questions/:id', () => {
      it('updates questions by id', async () => {
        const questionItem = questions[0]
        const response = await request(app)
          .patch(`/questions/${questionItem.id}`)
          .send({ question: 'updatedQuestion' })
        const updatedQuestionRecord = await Question.findByPk(questionItem.id, {
          raw: true
        })

        expect(response.status).to.equal(200)
        expect(updatedQuestionRecord.question).to.equal('updatedQuestion')
      })

      it('returns a 404 if the question does not exist', async () => {
        const response = await request(app)
          .patch('/questions/12345')
          .send({ question: 'updatedQuestion' })

        expect(response.status).to.equal(404)
        expect(response.body.error).to.equal('The question could not be found.')
      })
    })

    describe('DELETE /questions/:id', () => {
      it('deletes question record by id', async () => {
        const questionItem = questions[0]
        const response = await request(app).delete(`/questions/${questionItem.id}`)
        const deletedQuestion = await Question.findByPk(questionItem.id, { raw: true })
        expect(response.status).to.equal(204)
        expect(deletedQuestion).to.equal(null)
      })

      it('returns a 404 if the question does not exist', async () => {
        const response = await request(app).delete('/questions/nonExistentQuestion')
        expect(response.status).to.equal(404)
        expect(response.body.error).to.equal('The question could not be found.')
      })
    })
  })
})
