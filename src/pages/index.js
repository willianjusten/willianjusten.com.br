import { getAllPosts } from 'lib/blog'
import BlogList from 'templates/blog-list'

const Post = ({ posts }) => {
  return <BlogList posts={posts} />
}

export async function getStaticProps() {
  const posts = getAllPosts()

  return {
    props: {
      posts
    }
  }
}

export default Post
