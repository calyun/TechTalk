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
      title: {
        type: DataTypes.STRING
      },
      body: {
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
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'reply'
  }
)

module.exports = Reply