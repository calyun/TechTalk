const{ Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')

class Reply extends Model {}

Reply.init(
  {
    reply_id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
      },
      body: {
        type: DataTypes.STRING
      },
      date: {
        type: DataTypes.STRING
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id'
        }
      },
      post_id: {
        type: DataTypes.INTEGER,
        references:{
          model: 'posts',
          key: 'post_id'
        }
      }
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'reply'
  }
)

module.exports = Reply