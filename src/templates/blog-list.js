import React from 'react'

import Layout from 'components/Layout/'
import SEO from 'components/Seo'
import Post from 'components/Post'

const BlogList = ({ posts }) => {
  // const { currentPage, numPages } = props.pageContext
  // const isFirst = currentPage === 1
  // const isLast = currentPage === numPages
  // const prevPage = currentPage - 1 === 1 ? '/' : `/page/${currentPage - 1}`
  // const nextPage = `/page/${currentPage + 1}`

  return (
    <Layout>
      <SEO title="Home" />
      {posts.map((post, i) => (
        <Post
          key={i}
          slug={post.slug}
          title={post.frontmatter.title}
          timeToRead={post.timeToRead}
          date={post.frontmatter.date}
          description={post.frontmatter.description}
          main_class={post.frontmatter.main_class}
        />
      ))}

      {/* <Pagination
        currentPage={currentPage}
        numPages={numPages}
        isFirst={isFirst}
        isLast={isLast}
        prevPage={prevPage}
        nextPage={nextPage}
      /> */}
    </Layout>
  )
}

export default BlogList
