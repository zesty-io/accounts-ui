const fs = require('fs')

module.exports = (from, to) => {
  if (!fs.existsSync(to)) {
    fs.mkdirSync(to)
  }
  fs.readdir(from, (err, files) => {
    if (!err) {
      files.forEach(file => {
        const is = fs.createReadStream(from + '/' + file)
        const os = fs.createWriteStream(to + '/' + file)
        is.pipe(os)
      })
    } else {
      throw err
    }
  })
}
