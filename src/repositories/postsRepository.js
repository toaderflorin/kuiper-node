const fs = require('fs')
const outputFolder = `${__dirname}/../output`

class PostsRepository {
  insert(post) {
    const result = fs.writeFileSync(`${outputFolder}/${post.title}.html`, `${post.content}`)
  }

  get(name) {  
    const content = fs.readFileSync(`${outputFolder}/${name}.html`, 'UTF-8')
    const result = { title: name, content }
    return result
  }

  list() {
    const results = fs.readdirSync(outputFolder).map(f => {
      return {
        title: f.replace('.html', '')        
      }
    })

    return results
  }

  delete(name) {
    fs.unlinkSync(`${outputFolder}/${name}.html`)
  }
}

module.exports = PostsRepository
