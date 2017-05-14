const models = require('../models')
const repositories = require('../repositories')

class PostsController {
  async index(req, res) {
    const user = req.params['user']
    const posts = await repositories.postsRepository.list(user)
    const ownProfile = (user === global.user)
    res.render('posts/index.hbs', {
      user: global.user,
      posts: posts.map((p) => { return Object.assign(p, { ownProfile }) }),      
    })
  }

  async create(req, res) {
    if (req.method === 'GET') {
      res.render('posts/create.hbs', { user: global.user })
    } else if (req.method === 'POST') {
      const post = new models.Post(global.user, req.body.title, req.body.content)
      await repositories.postsRepository.insert(post)
      res.redirect('/posts/' + global.user)
    }
  }

  async edit(req, res) {
    res.send('Not implemented yet')
  }

  async show(req, res) {
    const id = Number.parseInt(req.params['id'])   
    const post = await repositories.postsRepository.get(id)    
    res.render('posts/show.hbs', { user: global.user, post })
  }

  async delete(req, res) {
    const id = Number.parseInt(req.params['id'])
    await repositories.postsRepository.delete(id)
    res.redirect(`/posts/${global.user}`)
  }
}

module.exports = PostsController