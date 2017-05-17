class Comment {
  constructor (user, postId, comment) {
    this.id = (Math.trunc(Math.random() * 100000000)).toString()
    this.postId = postId
    this.comment = comment
    this.user = user   
  }
}

module.exports = Comment
