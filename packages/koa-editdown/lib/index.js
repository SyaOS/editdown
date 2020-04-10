const Koa = require('koa')

const info = require('./controllers/info')

class Editdown extends Koa {
  constructor () {
    super()
    this.use(info)
  }
}

module.exports = Editdown

if (require.main === module) {
  new Editdown().listen(process.env.PORT, process.env.HOSTNAME)
}
