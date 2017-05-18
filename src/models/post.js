class Post {
  constructor (title, content) {
    this.id = (Math.trunc(Math.random() * 100000000)).toString()
    this.title = title
    this.content = content    
    const dtNumber = Date.now()
    const dt = new Date(dtNumber)
    this.postedAt = dt.toLocaleString()
  }
}

module.exports = Post
