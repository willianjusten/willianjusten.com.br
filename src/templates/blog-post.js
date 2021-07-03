import Link from 'next/link'

import SEO from 'components/Seo'
// import RecommendedPosts from '../components/RecommendedPosts'

import {
  PostHeader,
  PostTitle,
  PostDescription,
  PostDate,
  MainContent,
  ButtonBack
} from '../styles/base'

// a function to calculate reading time
const timeToRead = text => {
  const words = text.split(' ')
  const minutes = Math.ceil(words.length / 200)
  return `${minutes} min de leitura`
}

const BlogPost = ({ post }) => {
  // const next = props.pageContext.next
  // const previous = props.pageContext.previous

  return (
    <>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description}
        image={`https://willianjusten.com.br${post.frontmatter.image}`}
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
      {/* <RecommendedPosts next={next} previous={previous} /> */}
    </>
  )
}

export default BlogPost
