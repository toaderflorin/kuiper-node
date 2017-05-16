const authenticate = (req, res, next) => {
  const user = req.cookies['user'];
  console.log('COOKIE IS:', user)

  if (!user && req.url != '/') {    
    res.redirect('http://localhost:3000/')
  } else {
    res.cookie('user', user)
    next()
  }
}

module.exports = authenticate