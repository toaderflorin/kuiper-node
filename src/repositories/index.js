const PostsRepository = require('./postsRepository')
const SqliteWrapper = require('./sqliteWrapper')
const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('kuiper.db')
const wrapper = new SqliteWrapper(db)

async function createDbIfMissing () {
  await wrapper.run('CREATE TABLE IF NOT EXISTS posts (id NVARCHAR(10), postedAt NVARCHAR(20), title TEXT, content TEXT)')
}

exports.createDbIfMissing = createDbIfMissing
exports.postsRepository = new PostsRepository(db)