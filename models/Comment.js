const { Model, DataTypes } = require('sequelize')
const db = require('../db/connection')
const Post = require('./Post')
const User = require('./User')

class Comment extends Model { }

Comment.init({
    
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
      }, 

}, {
    sequelize: db,
    modelName: 'comment'
})


Comment.associate = (models) => {
    Comment.belongsTo(models.User, {
      foreignKey: "user_id",
    });
}

Comment.belongsTo(User)
module.exports = Comment;