const { postsController, usersController, commentsController } = require('./controllers')

module.exports = (app) => {
  app.get('/', usersController.logon)
  app.post('/', usersController.logon)
  app.get('/posts/:user', postsController.index)
  app.get('/posts', postsController.index)
  app.get('/logoff', usersController.logoff)
  app.get('/posts/:user/:id', postsController.details)
  app.get('/users', usersController.users)
  app.get('/new', postsController.create)
  app.post('/new', postsController.create)
  app.post('/comment/:user/:postId', commentsController.create)
  app.get('/delete/:id', postsController.delete)  
}