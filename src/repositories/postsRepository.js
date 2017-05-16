const sqlite3 = require('sqlite3')
const promisify = require('../promisify')
const SqliteWrapper = require('./sqliteWrapper')

class PostsRepository {
  constructor(db) {
    this._sqliteWrapper = new SqliteWrapper(db)
  }

  async insert(post) {
    await this._sqliteWrapper.run(
      `INSERT INTO posts ('id', 'title', 'content', 'user', 'postedAt') 
      VALUES ('${post.id}','${post.title}', '${post.content}', '${post.user}', '${post.postedAt}')`)
  }

  async get(id) {
    const query = `SELECT * FROM posts WHERE id='${id}'`    
    const result = await this._sqliteWrapper.all(`SELECT * FROM posts WHERE id=${id}`)    
    return result[0]
  }

  async list(user) {
    const query = `SELECT * FROM posts WHERE user='${user}'`
    const results = await this._sqliteWrapper.all(query)
    return results
  }

  async delete(id) {
    await this._sqliteWrapper.run(`DELETE FROM posts WHERE id=${id}`)
  }

  async getUsers() {
    const result = await this._sqliteWrapper.all(`SELECT DISTINCT user FROM posts`)
    return result
  }
}

module.exports = PostsRepository
