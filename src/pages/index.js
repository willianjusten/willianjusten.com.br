import fs from 'fs'
import { getAllPosts } from 'lib/api'
import { generateRss } from 'lib/generateRSS'
import { generateSitemap } from 'lib/generateSitemap'

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
