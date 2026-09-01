#!/usr/bin/env node
/**
 * Un server static, fără nicio dependență.
 *
 * Site-ul este numai HTML: se poate deschide și cu dublu clic pe `acasa.html`,
 * iar toate legăturile dintre pagini funcționează așa. Serverul ăsta există
 * pentru două lucruri pe care `file://` nu le face: adresa arată ca în
 * producție (`/acasa` merge, nu doar `/acasa.html`, exact ca în `nginx.conf`)
 * și pagina se reîncarcă normal.
 *
 * Scris pe `node:http`, deci nu se instalează nimic: `npm start` merge și fără
 * internet, imediat după clonă.
 */

import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { extname, join, normalize, resolve } from 'node:path'

const RADACINA = resolve(import.meta.dirname)
const PORT = Number(process.env.PORT ?? 8000)

const TIPURI = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.pdf': 'application/pdf',
}

/** Calea cerută, curățată: nimic nu iese din directorul site-ului. */
function caleSigura(url) {
  const fara = decodeURIComponent(url.split('?')[0].split('#')[0])
  const cale = resolve(join(RADACINA, normalize(fara)))
  return cale === RADACINA || cale.startsWith(RADACINA + '/') ? cale : null
}

async function fisier(cale) {
  try {
    const s = await stat(cale)
    return s.isFile() ? cale : null
  } catch {
    return null
  }
}

const server = createServer(async (cerere, raspuns) => {
  const cale = caleSigura(cerere.url ?? '/')
  if (!cale) {
    raspuns.writeHead(403).end('Interzis')
    return
  }

  /* Aceleași încercări ca `try_files $uri $uri.html $uri/` din nginx.conf, ca
   * adresele să fie identice local și în producție. */
  const gasit =
    (await fisier(cale)) ??
    (await fisier(cale + '.html')) ??
    (await fisier(join(cale, 'acasa.html'))) ??
    (await fisier(join(cale, 'index.html')))

  if (!gasit) {
    raspuns.writeHead(404, { 'content-type': 'text/html; charset=utf-8' })
    raspuns.end('<h1>404</h1><p>Pagina nu există. <a href="/">Înapoi la Acasă</a></p>')
    return
  }

  raspuns.writeHead(200, {
    'content-type': TIPURI[extname(gasit)] ?? 'application/octet-stream',
    'cache-control': 'no-store',
  })
  raspuns.end(await readFile(gasit))
})

server.listen(PORT, () => {
  console.log(`\n  Site-ul rulează pe \x1b[1mhttp://localhost:${PORT}\x1b[0m`)
  console.log('  Oprește cu Ctrl+C.\n')
})

server.on('error', (e) => {
  if (e.code === 'EADDRINUSE') {
    console.error(`\n  Portul ${PORT} este ocupat. Încearcă:  PORT=8080 npm start\n`)
    process.exit(1)
  }
  throw e
})
