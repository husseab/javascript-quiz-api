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
  describe('with records in the database', () => {
    let questions

    beforeEach(async () => {
      questions = await Promise.all([
        Question.create({
          question: 'newQuestion1'
        }),
        Question.create({
            question: 'newQuestion2'
          }),
          Question.create({
            question: 'newQuestion3'
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

    describe('GET /answers/:id', () => {
      xit('gets answer record by id', async () => {
        const answerItem = answers[0]
        const response = await request(app).get(`/answers/${answerItem.id}`)
        expect(response.status).to.equal(200)
        expect(response.body.answer).to.equal(answerItem.answer)
      })

      xit('returns a 404 if the answer does not exist', async () => {
        const response = await request(app).get('/answers/12345')

        expect(response.status).to.equal(404)
        expect(response.body.error).to.equal('The answer could not be found.')
      })
    })

    describe('PATCH /answers/:id', () => {
      xit('updates answers by id', async () => {
        const answerItem = answers[0]
        const response = await request(app)
          .patch(`/answers/${answerItem.id}`)
          .send({ answer: 'updatedAnswer' })
        const updatedAnswerRecord = await Answer.findByPk(answerItem.id, {
          raw: true
        })

        expect(response.status).to.equal(200)
        expect(updatedAnswerRecord.answer).to.equal('updatedAnswer')
      })

      xit('returns a 404 if the answer does not exist', async () => {
        const response = await request(app)
          .patch('/answers/12345')
          .send({ answer: 'updatedAnswer' })

        expect(response.status).to.equal(404)
        expect(response.body.error).to.equal('The answer could not be found.')
      })
    })

    describe('DELETE /answers/:id', () => {
      xit('deletes answer record by id', async () => {
        const answerItem = answers[0]
        const response = await request(app).delete(`/answers/${answerItem.id}`)
        const deletedAnswer = await Answer.findByPk(answerItem.id, { raw: true })
        expect(response.status).to.equal(204)
        expect(deletedAnswer).to.equal(null)
      })

      xit('returns a 404 if the answer does not exist', async () => {
        const response = await request(app).delete('/answers/nonExistentAnswer')
        expect(response.status).to.equal(404)
        expect(response.body.error).to.equal('The answer could not be found.')
      })
    })
  })
})
