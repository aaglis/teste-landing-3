import { createServer } from 'node:http'
import { readFileSync, existsSync } from 'node:fs'
import { resolve, extname } from 'node:path'
import { Readable } from 'node:stream'

const PORT = process.env.PORT || 3000

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript',
  '.mjs': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
}

/**
 * Converte Node.js IncomingMessage para o Request da Web API
 * (necessário porque o bundle SSR do TanStack Start usa Fetch API)
 */
function toWebRequest(req, body) {
  const url = `http://${req.headers.host || 'localhost'}${req.url || '/'}`
  const init = { method: req.method, headers: new Headers(req.headers) }
  if (body && req.method !== 'GET' && req.method !== 'HEAD') {
    init.body = body
    init.duplex = 'half'
  }
  return new Request(url, init)
}

async function main() {
  const { default: handler } = await import('./dist/server/server.js')
  const clientDir = resolve('./dist/client')

  const server = createServer(async (req, res) => {
    try {
      const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`)

      // Serve arquivos estáticos do client build
      const filePath = resolve(clientDir, url.pathname === '/' ? 'index.html' : url.pathname.slice(1))
      if (existsSync(filePath) && !filePath.startsWith(clientDir + '/')) {
        // prevent path traversal
        res.writeHead(403); res.end(); return
      }
      if (existsSync(filePath)) {
        const stat = await import('node:fs').then(fs => fs.promises.stat(filePath))
        if (stat.isFile()) {
          const content = readFileSync(filePath)
          const ext = extname(filePath)
          res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' })
          res.end(content)
          return
        }
      }

      // SSR: coleta o body da requisição
      const chunks = []
      for await (const chunk of req) chunks.push(chunk)
      const webReq = toWebRequest(req, Buffer.concat(chunks))

      const response = await handler.fetch(webReq, { context: {} })

      res.statusCode = response.status
      response.headers.forEach((v, k) => res.setHeader(k, v))
      if (response.body) {
        const reader = response.body.getReader()
        const pump = () => reader.read().then(({ done, value }) => {
          if (done) return res.end()
          res.write(value)
          pump()
        })
        pump()
      } else {
        res.end()
      }
    } catch (err) {
      console.error('Error:', err)
      if (!res.headersSent) {
        res.statusCode = 500
        res.end('Internal Server Error')
      }
    }
  })

  server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`)
  })
}

main().catch((err) => {
  console.error('Startup failed:', err)
  process.exit(1)
})
