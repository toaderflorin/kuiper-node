const { postsRepository } = require('../repositories')

class UsersController {
  async logon(req, res) {
    if (req.method === 'GET') {
      res.render('users/logon.hbs', {
        baseUrl: global.baseUrl
      })
    } else if (req.method === 'POST') {
      const currentUser = req.body.user
      res.cookie('user', currentUser)
      res.redirect(`${global.baseUrl}/${currentUser}`)
    }
  }

  async logoff(req, res) {
    if (req.method === 'GET') {
      res.clearCookie('user')
      res.redirect(`${global.baseUrl}`)
    }
  }

  async users(req, res) {
    const users = await postsRepository.getUsers()
    const currentUser = req.cookies.user

    res.render('users/list.hbs', {
      baseUrl: global.baseUrl,
      user: currentUser,
      users
    })
  }
}

module.exports = UsersController