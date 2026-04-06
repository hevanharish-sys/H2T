import { createReadStream, existsSync, statSync } from 'node:fs'
import { extname, join, normalize } from 'node:path'
import { createServer } from 'node:http'

const port = Number(process.env.PORT || 4173)
const root = normalize(join(process.cwd(), 'dist'))

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
}

function sendFile(response, filePath) {
  const extension = extname(filePath)
  response.writeHead(200, {
    'Content-Type': contentTypes[extension] || 'application/octet-stream',
    'Cache-Control': extension === '.html' ? 'no-cache' : 'public, max-age=300',
  })

  createReadStream(filePath).pipe(response)
}

const server = createServer((request, response) => {
  const rawPath = request.url?.split('?')[0] || '/'
  const safePath = normalize(join(root, rawPath === '/' ? 'index.html' : rawPath))

  if (!safePath.startsWith(root)) {
    response.writeHead(403)
    response.end('Forbidden')
    return
  }

  const resolvedPath = existsSync(safePath) && statSync(safePath).isFile()
    ? safePath
    : join(root, 'index.html')

  sendFile(response, resolvedPath)
})

server.listen(port, '127.0.0.1', () => {
  console.log(`Static site ready at http://127.0.0.1:${port}/`)
})
