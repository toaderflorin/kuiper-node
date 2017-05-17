const { Post } = require('../models')
const { postsRepository } = require('../repositories')

class PostsController {
  async index(req, res) {
    const user = req.params.user
    const posts = await postsRepository.list(user)
    const currentUser = req.cookies.user
    const ownProfile = (user === currentUser)

    res.render('posts/index.hbs', {
      user: currentUser,
      posts: posts.map((p) => { 
        return Object.assign(p, { ownProfile }) 
      }),
      hasPosts: posts.length > 0
    })
  }

  async create(req, res) {
    const currentUser = req.cookies.user

    if (req.method === 'GET') {
      res.render('posts/create.hbs', {       
        user: currentUser
      })
    } else if (req.method === 'POST') {
      const post = new Post(currentUser, req.body.title, req.body.content)
      await postsRepository.insert(post)
      res.redirect(`${global.baseUrl}/posts/${currentUser}`)
    }
  }

  async edit(req, res) {
    res.send('Not implemented yet')
  }

  async show(req, res) {
    const id = Number.parseInt(req.params.id)
    const post = await postsRepository.get(id)
    const currentUser = req.cookies.user
       
    res.render('posts/show.hbs', {      
      user: currentUser,
      post
    })
  }

  async delete(req, res) {
    const currentUser = req.cookies.user
    const id = Number.parseInt(req.params.id)
    await postsRepository.delete(id)
    res.redirect(`${global.baseUrl}/posts/${currentUser}`)
  }
}

module.exports = PostsController