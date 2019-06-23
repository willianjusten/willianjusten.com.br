import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Post from '../components/Post'

const IndexPage = props => {
  const postList = props.data.allMarkdownRemark
  return (
    <Layout>
      <SEO title="Home" />
      {postList.edges.map(({ node }, i) => (
        <Post
          key={i}
          slug={node.fields.slug}
          title={node.frontmatter.title}
          date={node.frontmatter.date}
          description={node.frontmatter.description}
          main_class={node.frontmatter.main_class}
        />
      ))}
    </Layout>
  )
}

export default IndexPage

export const PostListQuery = graphql`
  query PostListQuery {
    allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
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
        }
      }
    }
  }
`
