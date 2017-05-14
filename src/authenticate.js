const authenticate = (req, res, next) => {
  if (!global.user && req.url != '/') {
    res.redirect('http://localhost:3000/')
  } else {
    next()
  }
}

module.exports = authenticate