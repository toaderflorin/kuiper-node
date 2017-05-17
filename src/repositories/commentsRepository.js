const sqlite3 = require('sqlite3')
const promisify = require('../promisify')
const SqliteWrapper = require('./sqliteWrapper')

class CommentsRepository {
  constructor(db) {
    this._sqliteWrapper = new SqliteWrapper(db)
  }

  async insert(comment) {
    await this._sqliteWrapper.run(
      `INSERT INTO comments ('id', 'postId', 'comment', 'user', 'postedAt') 
      VALUES ('${comment.id}','${comment.postId}', '${comment.comment}', '${comment.user}', '${comment.postedAt}')`)
  }

  async getForPost(id) {
    
    const query = `SELECT * FROM comments WHERE postId='${id}'`    
    const result = await this._sqliteWrapper.all(query)    
    return result
  }  
}

module.exports = CommentsRepository
