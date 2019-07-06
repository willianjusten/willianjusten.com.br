import React, { useEffect } from 'react'
import { graphql } from 'gatsby'

import { Disqus } from 'gatsby-plugin-disqus'

import Layout from '../components/Layout/'
import SEO from '../components/Seo'

import {
  PostHeader,
  PostTitle,
  PostDescription,
  PostDate,
  MainContent
} from '../styles/base'

export default ({ data }) => {
  const post = data.markdownRemark

  const disqusConfig = {
    url: `https://willianjusten.com.br${post.fields.slug}`,
    identifier: `https://willianjusten.com.br${post.fields.slug}`,
    title: post.frontmatter.title
  }

  var load_disqus = false

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 500
      ) {
        load_disqus = true
      }
    })
  })

  return (
    <Layout>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description}
        image={`https://willianjusten.com.br${post.frontmatter.image}`}
      />
      <PostHeader>
        <PostDate>{post.frontmatter.date}</PostDate>
        <PostTitle>{post.frontmatter.title}</PostTitle>
        <PostDescription>{post.frontmatter.description}</PostDescription>
      </PostHeader>
      <MainContent>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />

        {load_disqus && <Disqus config={disqusConfig} />}
      </MainContent>
    </Layout>
  )
}

export const query = graphql`
  query Post($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      fields {
        slug
      }
      html
      frontmatter {
        date(locale: "pt-br", formatString: "DD [de] MMMM [de] YYYY")
        image
        description
        title
      }
    }
  }
`
