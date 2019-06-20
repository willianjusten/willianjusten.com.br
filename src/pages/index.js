import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

const IndexPage = props => {
  const postList = props.data.allMarkdownRemark
  return (
    <Layout>
      <SEO title="Home" />
      {postList.edges.map(({ node }) => (
        <Link to={node.fields.slug}>
          <div className="post-list">
            <h1>{node.frontmatter.title}</h1>
            <span>{node.frontmatter.date}</span>
            <p>{node.frontmatter.description}</p>
          </div>
        </Link>
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
            date
            description
            main_class
            title
          }
        }
      }
    }
  }
`
