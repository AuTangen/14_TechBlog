const { Model, DataTypes } = require('sequelize')
const db = require('../db/connection')
const Post = require('./Post')

class Comment extends Model { }

Comment.init({
    
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize: db,
    modelName: 'comment'
})


// Comment.belongsTo(Post)
module.exports = Comment;