const repositories = require('../repositories')

class UsersController {
  async logon(req, res) {
    if (req.method === 'GET') {
      res.render('users/logon.hbs', {
        baseUrl: global.baseUrl
      })
    } else if (req.method === 'POST') {
      const currentUser = req.body.user
      res.cookie('user', currentUser)
      res.redirect(`http://localhost:3000/posts/${currentUser}`)
    }
  }

  async logoff(req, res) {
    if (req.method === 'GET') {
      res.clearCookie('user')
      res.redirect('http://localhost:3000')
    }
  }

  async users(req, res) {
    const users = await repositories.postsRepository.getUsers()
    const currentUser = req.cookies.user

    res.render('users/list.hbs', {
      baseUrl: global.baseUrl,
      user: currentUser,
      users
    })
  }
}

module.exports = UsersController