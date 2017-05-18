const { postsController } = require('./controllers')

module.exports = (app) => { 
  app.get('/delete/:name', postsController.delete)  
  app.get('/', postsController.index)    
  app.get('/new', postsController.create)
  app.post('/new', postsController.create)
  app.get('/:name', postsController.details)
}