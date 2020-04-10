const { version } = require('../../package.json')

module.exports = (context) => {
  context.body = { version }
}
