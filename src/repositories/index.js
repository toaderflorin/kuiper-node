const PostsRepository = require('./postsRepository')
const CommentsRepository = require('./commentsRepository')
const SqliteWrapper = require('./sqliteWrapper')
const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('kuiper.db')
const wrapper = new SqliteWrapper(db)

async function createDbIfMissing () {
  await wrapper.run('CREATE TABLE IF NOT EXISTS posts (id NVARCHAR(10), postedAt NVARCHAR(20), user NVARCHAR(30), title TEXT, content TEXT)')
  await wrapper.run('CREATE TABLE IF NOT EXISTS comments (id NVARCHAR(10), postId NVARCHAR(20), postedAt NVARCHAR(20), user NVARCHAR(30), comment TEXT)')
}

exports.createDbIfMissing = createDbIfMissing
exports.postsRepository = new PostsRepository(db)
exports.commentsRepository = new CommentsRepository(db)