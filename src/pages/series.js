import React from 'react'
import { graphql } from 'gatsby'
import slugify from 'slugify'

import { unique } from '../utils/index'

import Layout from '../components/layout'
import SEO from '../components/seo'
import PostItem from '../components/Post'

const SeriesPage = props => {
  const postList = props.data.allMarkdownRemark.edges.filter(
    ({ node }) => node.frontmatter.categories !== null
  )

  const categories = postList
    .map(({ node }) => node.frontmatter.categories[0])
    .filter(unique)

  const slugifyCategory = category => slugify(category, { lower: true })

  const getPostsByCategory = category =>
    postList.filter(({ node }) => node.frontmatter.categories[0] === category)

  return (
    <Layout>
      <SEO title="Series" />
      {categories.map((category, i) => (
        <section key={i}>
          <h2 id={slugifyCategory(category)}>{category}</h2>

          {getPostsByCategory(category).map(({ node }) => (
            <PostItem
              key={node.id}
              slug={node.fields.slug}
              title={node.frontmatter.title}
              date={node.frontmatter.date}
              description={node.frontmatter.description}
              main_class={node.frontmatter.main_class}
            />
          ))}
        </section>
      ))}
    </Layout>
  )
}

export default SeriesPage

export const PostListQuery = graphql`
  query SeriesListQuery {
    allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            date(locale: "pt-br", formatString: "DD [de] MMMM [de] YYYY")
            title
            description
            categories
          }
        }
      }
    }
  }
`
