import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout/'
import SEO from '../components/Seo'
import Post from '../components/Post'
import Pagination from '../components/Pagination'

const BlogList = props => {
  const postList = props.data.allMarkdownRemark.edges

  const { currentPage, numPages } = props.pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = currentPage - 1 === 1 ? '/' : `/page/${currentPage - 1}`
  const nextPage = `/page/${currentPage + 1}`

  return (
    <Layout>
      <SEO title="Home" />
      {postList.map(({ node }, i) => (
        <Post
          key={i}
          slug={node.fields.slug}
          title={node.frontmatter.title}
          timeToRead={node.timeToRead}
          date={node.frontmatter.date}
          description={node.frontmatter.description}
          main_class={node.frontmatter.main_class}
        />
      ))}

      <Pagination
        currentPage={currentPage}
        numPages={numPages}
        isFirst={isFirst}
        isLast={isLast}
        prevPage={prevPage}
        nextPage={nextPage}
      />
    </Layout>
  )
}

export default BlogList

export const PostListQuery = graphql`
  query PostListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(locale: "pt-br", formatString: "DD [de] MMMM [de] YYYY")
            description
            main_class
            title
          }
          timeToRead
        }
      }
    }
  }
`
