const User = require('./User');
const Post = require('./Post');
const Reply = require('./Reply')

/** Setting relationship between User and the many tables that use it.
 * ex. User can have many posts, but a post can only belong to one user.
 */

User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
})

Post.belongsTo(User, {
  foreignKey: 'user_id'
})

User.hasMany(Reply, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
})

Reply.belongsTo(User, {
  foreignKey: 'user_id'
})


//Setting post and reply

Post.hasMany(Reply, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
})

Reply.belongsTo(Post, {
  foreignKey: 'post_id'
})

module.exports = {User, Post, Reply}