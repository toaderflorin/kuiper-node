const controllers = require('./controllers')

module.exports = (app) => {
  app.get('/', controllers.usersController.logon)
  app.post('/', controllers.usersController.logon)
  app.get('/posts/:user', controllers.postsController.index)
  app.get('/posts', controllers.postsController.index)
  app.get('/logoff', controllers.usersController.logoff)
  app.get('/posts/:user/:id', controllers.postsController.show)
  app.get('/users', controllers.usersController.users)
  app.get('/new', controllers.postsController.create)
  app.post('/new', controllers.postsController.create)
  app.get('/delete/:id', controllers.postsController.delete)  
}