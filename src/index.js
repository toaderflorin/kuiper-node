const express = require('express')
const expressHbs = require('express-handlebars')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
const repos = require('./repositories')
const passport = require('passport')
const authenticate = require('./authenticate')
const configureRoutes = require('./routes')

const start = async () => {
  app.set('views', path.join(__dirname, '/views'))

  const hbs = expressHbs.create({
    helpers: {
      baseUrl: (context, options) => {
        return 'blabla'
      }
    }
  });
  
  app.engine('handlebars', hbs.engine);
  app.set('view engine', 'handlebars');
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(express.static(__dirname + '/content'))
  
  app.engine('hbs', expressHbs({ extname: 'hbs', 
    defaultLayout: 'main.hbs', 
    layoutsDir: __dirname + '/views/layouts' 
  }))

  app.use(authenticate)

  await configureRoutes(app)
  await repos.createDbIfMissing()

  global.baserUrl = 'http://localhost:3000'
  app.listen(3000, () => console.log('Started successfully, open localhost:3000.'))
}

start()
