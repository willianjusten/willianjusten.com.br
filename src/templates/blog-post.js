import Prism from 'prismjs'

import { useEffect } from 'react'
import Link from 'next/link'
import { NextSeo } from 'next-seo'

import { timeToRead } from 'lib/utils'

import RecommendedPosts from 'components/RecommendedPosts'
import Comments from 'components/Comments'

import {
  PostHeader,
  PostTitle,
  PostDescription,
  PostDate,
  MainContent,
  ButtonBack
} from 'styles/base'

const BlogPost = ({ post }) => {
  useEffect(() => {
    Prism.highlightAll()
  }, [post])

  return (
    <>
      <NextSeo
        title={`${post.frontmatter.title} - Willian Justen`}
        description={post.frontmatter.description}
        openGraph={{
          url: `https://willianjusten.com.br/${post.slug}`,
          title: `${post.frontmatter.title} - Willian Justen`,
          description: post.frontmatter.description,
          images: [
            {
              url: `https://og-image-service.willianjusten.com.br/${encodeURIComponent(
                post.frontmatter.title
              )}.png`,
              alt: `${post.frontmatter.title}`
            }
          ]
        }}
      />
      <PostHeader>
        <Link href="/" passHref>
          <ButtonBack>← Voltar na listagem</ButtonBack>
        </Link>

        <PostDate>
          {post.frontmatter.date} • {timeToRead(post.content)}
        </PostDate>
        <PostTitle>{post.frontmatter.title}</PostTitle>
        <PostDescription>{post.frontmatter.description}</PostDescription>
      </PostHeader>
      <MainContent>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </MainContent>
      <RecommendedPosts next={post.nextPost} previous={post.prevPost} />
      <Comments title={post.frontmatter.title} />
    </>
  )
}

export default BlogPost
