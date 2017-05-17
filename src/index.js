const express = require('express')
const expressHbs = require('express-handlebars')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
const passport = require('passport')
const authenticate = require('./authenticate')
const configureRoutes = require('./routes')
const cookieParser = require('cookie-parser')
const { baseUrl } = require('./helpers')
const { createDbIfMissing } = require('./repositories')

const start = async () => {
  app.set('views', path.join(__dirname, '/views'))
  app.set('view engine', 'handlebars');
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(express.static(__dirname + '/content'))
  app.use(cookieParser())

  app.engine('hbs', expressHbs({
    extname: 'hbs',
    defaultLayout: 'main.hbs',
    layoutsDir: __dirname + '/views/layouts',
    helpers: {
      baseUrl
    }
  }))

  app.use(authenticate)

  configureRoutes(app)  
  await createDbIfMissing()

  global.baserUrl = 'http://localhost:3000'
  app.listen(3000, () => console.log('Started successfully, open localhost:3000.'))
}

start()
