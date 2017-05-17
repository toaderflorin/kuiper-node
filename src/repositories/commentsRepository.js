const sqlite3 = require('sqlite3')
const promisify = require('../promisify')
const SqliteWrapper = require('./sqliteWrapper')

class CommentsRepository {
  constructor(db) {
    this._sqliteWrapper = new SqliteWrapper(db)
  }

  async insert(comment) {
    await this._sqliteWrapper.run(
      `INSERT INTO comments ('id', 'title', 'content', 'user', 'postedAt') 
      VALUES ('${post.id}','${post.title}', '${post.content}', '${post.user}', '${post.postedAt}')`)
  }

  async getForPost(id) {
    const query = `SELECT * FROM comments WHERE postId='${id}'`    
    const result = await this._sqliteWrapper.all(query)    
    return result[0]
  }  
}

module.exports = CommentsRepository
