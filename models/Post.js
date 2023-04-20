const { Model, DataTypes } = require('sequelize')
const db = require('../db/connection')
const Comment = require('./Comment')
const User = require('./User')
class Post extends Model { }

Post.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id"
        }
      }
}, {
    sequelize: db,
    modelName: 'post'
})

// Post.hasMany(Comment)

module.exports = Post;