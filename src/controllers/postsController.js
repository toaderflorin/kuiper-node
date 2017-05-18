const { Post } = require('../models')
const { postsRepository } = require('../repositories')

class PostsController {
  index(req, res) {
    const posts = postsRepository.list()
    res.render('posts/index.hbs', {      
      posts: posts.map(p => Object.assign(p, { titleEncoded: encodeURIComponent(p.title) })),
      hasPosts: posts.length > 0
    })
  }

  create(req, res) {      
    if (req.method === 'GET') {
      res.render('posts/new.hbs')
    } else if (req.method === 'POST') {
      const post = new Post(req.body.title, req.body.content)
      postsRepository.insert(post)
      res.redirect(`${global.baseUrl}`)
    }
  }

  edit(req, res) {
    res.send('Not implemented yet')
  }

  details(req, res) {
    const decodedName = decodeURIComponent(req.params.name)
    const post = postsRepository.get(decodedName)
       
    res.render('posts/details.hbs', {      
      post,
    })
  }

  delete(req, res) {    
    const decodedName = decodeURIComponent(req.params.name)
    postsRepository.delete(decodedName)
    res.redirect(`${global.baseUrl}`)
  }  
}

module.exports = PostsController