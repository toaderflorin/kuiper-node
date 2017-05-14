const repositories = require('../repositories')

class UsersController {
  async logon(req, res) {
    if (req.method === 'GET') {
      res.render('users/logon.hbs')
    } else if (req.method === 'POST') {
      global.user = req.body.user
      res.redirect(`http://localhost:3000/posts/${global.user}`)
    }
  }

  async logoff(req, res) {
    if (req.method === 'GET') {
      res.redirect('http://localhost:3000')
    }
  }

  async users(req, res) {
    const users = await repositories.postsRepository.getUsers()
    res.render('users/list', { user: global.user, users })
  }
}

module.exports = UsersController