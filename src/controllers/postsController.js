const models = require('../models')
const repositories = require('../repositories')

class PostsController {
  async index(req, res) {
    const user = req.params.user
    const posts = await repositories.postsRepository.list(user)
    const currentUser = req.cookies.user
    const ownProfile = (user === currentUser)
    
    res.render('posts/index.hbs', {
      user: currentUser,
      posts: posts.map((p) => { return Object.assign(p, { ownProfile }) }),
      baseUrl: global.baseUrl,
      hasPosts: posts.length > 0
    })
  }

  async create(req, res) {
    const currentUser = req.cookies.user

    if (req.method === 'GET') {
      res.render('posts/create.hbs', {
        baseUrl: global.baseUrl,
        user: currentUser        
      })
    } else if (req.method === 'POST') {
      const post = new models.Post(currentUser, req.body.title, req.body.content)
      await repositories.postsRepository.insert(post)
      res.redirect('/posts/' + currentUser)
    }
  }

  async edit(req, res) {
    res.send('Not implemented yet')
  }

  async show(req, res) {
    const id = Number.parseInt(req.params.id)
    const post = await repositories.postsRepository.get(id)
    const currentUser = req.cookies.user

    res.render('posts/show.hbs', {
      baseUrl: global.baseUrl,
      currentUser,
      post
    })
  }

  async delete(req, res) {
    const currentUser = req.cookies.user
    const id = Number.parseInt(req.params.id)
    await repositories.postsRepository.delete(id)
    res.redirect(`/posts/${currentUser}`)
  }
}

module.exports = PostsController