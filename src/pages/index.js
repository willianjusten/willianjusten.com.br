import { getAllPosts } from 'lib/api'
import { buildAlgoliaIndexes } from 'lib/buildAlgoliaIndexes'

import BlogList from 'templates/blog-list'

const Post = ({ posts }) => {
  return <BlogList posts={posts} />
}

export async function getStaticProps() {
  const posts = getAllPosts()

  if (process.env.NODE_ENV !== 'development') {
    await buildAlgoliaIndexes(posts)
  }

  return {
    props: {
      posts
    }
  }
}

export default Post
