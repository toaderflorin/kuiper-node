const { Post } = require('../models')
const { postsRepository } = require('../repositories')

class PostsController {
  async index(req, res) {
    const posts = await postsRepository.list()
    res.render('posts/index.hbs', {      
      posts,
      hasPosts: posts.length > 0
    })
  }

  async create(req, res) {      
    if (req.method === 'GET') {
      res.render('posts/new.hbs')
    } else if (req.method === 'POST') {
      const post = new Post(req.body.title, req.body.content)
      await postsRepository.insert(post)
      res.redirect(`${global.baseUrl}`)
    }
  }

  async edit(req, res) {
    res.send('Not implemented yet')
  }

  async details(req, res) {
    const id = Number.parseInt(req.params.id)
    const post = await postsRepository.get(id)
       
    res.render('posts/details.hbs', {      
      post,
    })
  }

  async delete(req, res) {
    const id = Number.parseInt(req.params.id)
    await postsRepository.delete(id)
    res.redirect(`${global.baseUrl}`)
  }  
}

module.exports = PostsController