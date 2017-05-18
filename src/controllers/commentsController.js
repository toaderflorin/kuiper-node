const { commentsRepository } = require('../repositories')
const { Comment } = require('../models')

class CommentsController {
  async create(req, res) {
    const postId = req.params.postId
    const user = req.params.user
    const currentUser = req.cookies.user
    const text = req.body.comment  
    const comment = new Comment(user, postId, text)
        
    await commentsRepository.insert(comment)

    res.redirect(`${global.baseUrl}/posts/${user}/${postId}`)    
  }
}

module.exports = CommentsController