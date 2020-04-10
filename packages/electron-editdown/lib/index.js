const { createServer } = require('http')
const { app, BrowserWindow } = require('electron')
const KoaEditdown = require('koa-editdown')

async function createEditdownServer () {
  const server = await new Promise((resolve, reject) => {
    const app = new KoaEditdown()
    const server = createServer(app.callback())

    function handleListening () {
      server.off('error', handleError)
      resolve(server)
    }
    function handleError (error) {
      server.off('listening', handleListening)
      reject(error)
    }

    server.once('listening', handleListening)
    server.once('error', handleError)
    server.listen(0, '127.0.0.1')
  })
  const { address, port } = server.address()
  return new URL(`http://${address}:${port}/`)
}

async function createEditdownWindow () {
  await app.whenReady()
  const browserWindow = new BrowserWindow({
    show: false
  })
  browserWindow.once('ready-to-show', () => browserWindow.show())
  return browserWindow
}

async function main () {
  const [src, window] = await Promise.all([
    createEditdownServer(),
    createEditdownWindow()
  ])

  window.loadFile(require.resolve('./index.html'), { query: { src: src.href } })
}

if (require.main === module) {
  main().catch((error) => {
    console.error(error)
    process.exit(1)
  })
}
