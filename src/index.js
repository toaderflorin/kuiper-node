const express = require('express')
const expressHbs = require('express-handlebars')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
const controllers = require('./controllers')
const repos = require('./repositories')
const passport = require('passport')

const start = async () => {
  app.set('views', path.join(__dirname, '/views'))
  app.set('view engine', 'hbs')
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true })) 

  app.use(express.static(__dirname + '/content'))
  // app.use('/static', express.static(__dirname + '/src/content/'))

  // app.use('/static', express.static(__dirname + '/public'));
  app.engine('hbs', expressHbs({ extname: 'hbs', defaultLayout: 'main.hbs', layoutsDir: __dirname + '/views/layouts' }))

  app.get('/', controllers.usersController.logon)
  app.post('/', controllers.usersController.logon)

  app.get('/posts/:user', controllers.postsController.index)
  app.get('/posts', controllers.postsController.index)
  app.get('/posts/:id', controllers.postsController.show)   
  app.get('/users', controllers.usersController.users)
  app.get('/new', controllers.postsController.create)
  app.post('/new', controllers.postsController.create)
  app.get('/delete/:id', controllers.postsController.delete)
  

  console.log(__dirname)

  await repos.createDbIfMissing()
  app.listen(3000, () => console.log('Started successfully, open localhost:3000.'))
}

start()
