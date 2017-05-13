const promisify = (func) => {
  return (...args) => {
    return new Promise((resolve, reject) => {
      func(...args, (error, result) => {
        return error ? reject(error) : resolve(result)
      })
    })
  }
}

module.exports = promisify
