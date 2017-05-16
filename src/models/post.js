class Post {
  constructor (user, title, content) {
    this.id = (Math.trunc(Math.random() * 100000000)).toString()
    this.title = title
    this.content = content
    this.user = user    
    const dtNumber = Date.now()
    const dt = new Date(dtNumber)

    this.postedAt = dt.toLocaleString()
    this.comments = []
  }
}

module.exports = Post
