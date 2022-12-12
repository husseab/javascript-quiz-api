module.exports = (connection, DataTypes) => {
    const schema = {
      answer: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: 'Answer cannot be null'
          },
          notEmpty: {
            args: true,
            msg: 'Answer cannot be empty'
          }
        }
      }
    }
    const RemoveTimeStamp = {
      defaultScope: {
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      },
      timestamps: false
    }
  
    const answerModel = connection.define('Answer', schema, RemoveTimeStamp)
    return answerModel
  }