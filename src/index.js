const express = require('express')
const expressHbs = require('express-handlebars')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
const controllers = require('./controllers')
const repos = require('./repositories')
const passport = require('passport')
const authenticate = require('./authenticate')

const start = async () => {
  app.set('views', path.join(__dirname, '/views'))
  app.set('view engine', 'hbs')
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(express.static(__dirname + '/content'))
  app.engine('hbs', expressHbs({ extname: 'hbs', defaultLayout: 'main.hbs', layoutsDir: __dirname + '/views/layouts' }))
  app.use(authenticate)
  app.get('/', controllers.usersController.logon)
  app.post('/', controllers.usersController.logon)

  app.get('/posts/:user', controllers.postsController.index)
  app.get('/posts', controllers.postsController.index)
  app.get('/logoff', controllers.usersController.logoff)
  app.get('/posts/:id', controllers.postsController.show)
  app.get('/users', controllers.usersController.users)
  app.get('/new', controllers.postsController.create)
  app.post('/new', controllers.postsController.create)
  app.get('/delete/:id', controllers.postsController.delete)
  

  await repos.createDbIfMissing()
  app.listen(3000, () => console.log('Started successfully, open localhost:3000.'))
}

start()
