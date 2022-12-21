module.exports = (connection, DataTypes) => {
    const schema = {
      question: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: 'Question cannot be null'
          },
          notEmpty: {
            args: true,
            msg: 'Question cannot be empty'
          }
        }
      },
      topic: {
        type: DataTypes.STRING,
        allowNull: false,
      } 
    }
    const RemoveTimeStamp = {
      defaultScope: {
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      },
      timestamps: false
    }
  
    const QuestionModel = connection.define('Question', schema, RemoveTimeStamp)
    return QuestionModel
  }