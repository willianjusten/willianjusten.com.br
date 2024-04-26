import fs from 'fs'
import { getAllPosts } from 'lib/api'
import { buildAlgoliaIndexes } from 'lib/buildAlgoliaIndexes'
import { generateRss } from 'lib/generateRSS'
import { generateSitemap } from 'lib/generateSitemap'

import BlogList from 'templates/blog-list'

const Post = ({ posts }) => {
  return <BlogList posts={posts} />
}

export async function getStaticProps() {
  const posts = getAllPosts()

  if (process.env.NODE_ENV !== 'development') {
    await generateSitemap(posts)

    const rss = await generateRss(posts)
    fs.writeFileSync('./public/feed.xml', rss)

    await buildAlgoliaIndexes(posts)
  }

  return {
    props: {
      posts
    }
  }
}

export default Post
