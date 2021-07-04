import fs from 'fs'
import { getAllPosts } from 'lib/api'
import { generateRss } from 'lib/rss'
import generateSitemap from 'lib/sitemap'

import BlogList from 'templates/blog-list'

const Post = ({ posts }) => {
  return <BlogList posts={posts} />
}

export async function getStaticProps() {
  const posts = getAllPosts()

  await generateSitemap(posts)

  const rss = await generateRss(posts)
  fs.writeFileSync('./public/feed.xml', rss)

  return {
    props: {
      posts
    }
  }
}

export default Post
