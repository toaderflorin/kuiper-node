const promisify = require('../promisify')

class SqliteWrapper {
  constructor(db) {
    const dbRun = db.run.bind(db)
    const dbAll = db.all.bind(db)
    this.run = promisify(dbRun)
    this.all = promisify(dbAll)
  }
}

module.exports = SqliteWrapper
