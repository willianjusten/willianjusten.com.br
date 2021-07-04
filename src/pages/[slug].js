import BlogPost from 'templates/blog-post'
import { getPostBySlug, getAllPosts } from 'lib/api'
import markdownToHtml from 'lib/markdownToHtml'

const Post = post => {
  return <BlogPost post={post} />
}

export default Post

export async function getStaticProps({ params }) {
  const slug = params.slug
  const post = getPostBySlug(slug)
  const content = await markdownToHtml(post.content || '')

  // get prev/next posts
  const allPosts = getAllPosts()
  const currentPostIndex = allPosts.findIndex(p => p.slug === slug)
  const nextPost = allPosts[currentPostIndex - 1] ?? null
  const prevPost = allPosts[currentPostIndex + 1] ?? null

  return {
    props: {
      ...post,
      content,
      nextPost,
      prevPost
    }
  }
}

export async function getStaticPaths() {
  const posts = getAllPosts()
  const paths = posts.map(({ slug }) => ({ params: { slug } }))

  return {
    paths,
    fallback: false
  }
}
