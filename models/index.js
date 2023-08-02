const Post = require('./Post')
const User = require('./User')
const Comment = require('./Comment')

User.hasMany(Post, { foreignKey: "user_id" });
User.hasMany(Comment, { foreignKey: "user_id" });
Post.belongsTo(User, { foreignKey: "user_id" });
Post.hasMany(Comment, {foreignKey: "comment_id" })


Comment.belongsTo(User, { foreignKey: "user_id" });


module.exports = { User, Comment, Post };