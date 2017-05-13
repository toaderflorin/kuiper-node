const repositories = require('../repositories')

class UsersController {
  logon(req, res) {
    if (req.method === 'GET') {
      res.render('users/logon.hbs')
    } else if (req.method === 'POST') {
      global.user = req.body.user
      res.redirect(`/posts`)
    }
  }

  async users(req, res) {
    const users = await repositories.postsRepository.getUsers()
    console.log({ users })
    res.render('users/list', { users })
  }
}

module.exports = UsersController