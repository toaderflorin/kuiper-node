class CommentsController {
  create(req, res) {
    const postId = req.params.postId
    const currentUser = req.cookies.user
  }
}

module.exports = CommentsController