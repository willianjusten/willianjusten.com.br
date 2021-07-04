import { BLOG_URL } from './constants'

const globby = require('globby')
const { SitemapStream, streamToPromise } = require('sitemap')
const { Readable } = require('stream')
const fs = require('fs')

// pages that should not be in the sitemap
const blocklist = ['/404']

export async function generateSitemap(posts) {
  if (process.env.NODE_ENV === 'development') {
    return
  }

  const baseUrl = BLOG_URL
  const pages = await globby([
    'src/pages/**/*{.js}',
    '!src/pages/**/[*',
    '!src/pages/_*.js',
    '!src/pages/api'
  ])

  // normal page routes
  const pageLinks = pages
    .map(page => {
      const path = page
        .replace('pages', '')
        .replace('.js', '')
        .replace('src/', '')
      return path === '/index'
        ? { url: '/', changefreq: 'daily', priority: 0.7 }
        : { url: path, changefreq: 'daily', priority: 0.7 }
    })
    .filter(page => !blocklist.includes(page.url))

  // post routes
  const postLinks = posts.map(post => ({
    url: `/${post.slug}`,
    changefreq: 'daily',
    priority: 0.7
  }))

  const links = [...pageLinks, ...postLinks]
  const stream = new SitemapStream({ hostname: baseUrl })

  const xml = await streamToPromise(Readable.from(links).pipe(stream)).then(
    data => data.toString()
  )

  fs.writeFileSync('./public/sitemap.xml', xml)
}
