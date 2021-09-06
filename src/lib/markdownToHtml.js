import remark from 'remark'
import html from 'remark-html'
import headings from 'remark-autolink-headings'
import slug from 'remark-slug'

export default async function markdownToHtml(markdown) {
  const result = await remark()
    .use(html)
    .use(slug)
    .use(headings, {
      behavior: 'wrap',
      linkProperties: {
        className: 'anchor'
      }
    })
    .process(markdown)

  return result.toString()
}
