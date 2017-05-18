const { postsController } = require('./controllers')

module.exports = (app) => { 
  app.get('/', postsController.index)    
  app.get('/new', postsController.create)
  app.post('/new', postsController.create)
  app.get('/:id', postsController.details)
  app.get('/delete/:id', postsController.delete)  
}