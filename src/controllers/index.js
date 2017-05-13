const PostsController = require('./postsController')
const CommentsController = require('./commentsController')
const UsersController = require('./usersController')

exports.postsController = new PostsController()
exports.commentsController = new CommentsController()
exports.usersController = new UsersController()