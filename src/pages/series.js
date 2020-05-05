import React from 'react'
import { graphql } from 'gatsby'
import slugify from 'slugify'

import { unique } from '../utils/index'

import styled from 'styled-components'
import media from 'styled-media-query'

import Layout from '../components/Layout/'
import SEO from '../components/Seo'
import Post from '../components/Post'

const SeriesTitle = styled.h2`
  background: var(--borders);
  color: var(--texts);
  font-size: 2rem;
  font-weight: 700;
  padding: 1rem 4.4rem;

  ${media.lessThan('large')`
    font-size: 1.5rem;
    padding: 1rem;
  `}
`

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
      <SEO
        title="Series"
        description="Aqui ficarão as series em que iremos abordar sobre determinados assuntos."
        image="https://willianjusten.com.br/assets/img/series.png"
      />
      {categories.map((category, i) => (
        <section key={i}>
          <SeriesTitle id={slugifyCategory(category)}># {category}</SeriesTitle>

          {getPostsByCategory(category).map(({ node }) => (
            <Post
              key={node.id}
              slug={node.fields.slug}
              title={node.frontmatter.title}
              date={node.frontmatter.date}
              description={node.frontmatter.description}
              main_class={node.frontmatter.main_class}
              disableCard={true}
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
