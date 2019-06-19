import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

const IndexPage = (props) => {
  const postList = props.data.allMarkdownRemark;
  return (
    <Layout>
      <SEO title="Home" />
      {postList.edges.map(({ node }, i) => (
        <div className="post-list">
          <h1>{node.frontmatter.title}</h1>
          <span>{node.frontmatter.date}</span>
          <p>{node.frontmatter.description}</p>
          <div>
            <div dangerouslySetInnerHTML={{ __html: node.html }} />
          </div>
        </div>
      ))}
    </Layout>
  )
}

export default IndexPage;

export const listQuery = graphql`
  query ListQuery {
    allMarkdownRemark(sort: {fields: frontmatter___date}) {
    edges {
      node {
        frontmatter {
          title
          date
          tags
          main_class
          layout
          introduction
          description
          twitter_text
          image
          color
          categories
        }
        timeToRead
        html
      }
    }
  }
  }
`