const sqlite3 = require('sqlite3')
const promisify = require('../promisify')
const SqliteWrapper = require('./sqliteWrapper')

class PostsRepository {
  constructor(db) {
    this._sqliteWrapper = new SqliteWrapper(db)
  }

  async insert(post) {
    await this._sqliteWrapper.run(
      `INSERT INTO posts ('id', 'title', 'content', 'postedAt') 
      VALUES ('${post.id}','${post.title}', '${post.content}', '${post.postedAt}')`)
  }

  async get(id) {
    const query = `SELECT * FROM posts WHERE id='${id}'`    
    const result = await this._sqliteWrapper.all(`SELECT * FROM posts WHERE id=${id}`)    
    return result[0]
  }

  async list() {
    const query = `SELECT * FROM posts`
    const results = await this._sqliteWrapper.all(query)
    return results
  }

  async delete(id) {
    console.log('got here')
    await this._sqliteWrapper.run(`DELETE FROM posts WHERE id=${id}`)
  }
}

module.exports = PostsRepository
