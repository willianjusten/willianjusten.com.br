import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout/'
import SEO from '../components/Seo'
import RecommendedPosts from '../components/RecommendedPosts'

import {
  PostHeader,
  PostTitle,
  PostDescription,
  PostDate,
  MainContent,
  ButtonBack
} from '../styles/base'

const BlogPost = props => {
  const post = props.data.markdownRemark
  const next = props.pageContext.next
  const previous = props.pageContext.previous

  return (
    <Layout>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description}
        image={`https://willianjusten.com.br${post.frontmatter.image}`}
      />
      <PostHeader>
        <ButtonBack
          to="/"
          cover
          direction="left"
          duration={0.8}
        >
          ← Voltar na listagem
        </ButtonBack>

        <PostDate>
          {post.frontmatter.date} • {post.timeToRead} min de leitura
        </PostDate>
        <PostTitle>{post.frontmatter.title}</PostTitle>
        <PostDescription>{post.frontmatter.description}</PostDescription>
      </PostHeader>
      <MainContent>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </MainContent>
      <RecommendedPosts next={next} previous={previous} />
    </Layout>
  )
}

export default BlogPost

export const query = graphql`
  query Post($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      fields {
        slug
      }
      frontmatter {
        date(locale: "pt-br", formatString: "DD [de] MMMM [de] YYYY")
        image
        description
        title
      }
      timeToRead
    }
  }
`
