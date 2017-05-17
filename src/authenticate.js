const authenticate = (req, res, next) => {
  const user = req.cookies.user
 
  // this sucks
  if (user === 'undefined' && req.url != '/') {       
    res.redirect(global.baseUrl)
  } else {
    res.cookie('user', user)
    next()
  }
}

module.exports = authenticate