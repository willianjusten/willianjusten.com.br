import { NextSeo } from 'next-seo'
import styled from 'styled-components'
import media from 'styled-media-query'

import slugify from 'slugify'
import { getAllPosts } from 'lib/api'
import { unique } from 'lib/utils'

import Post from 'components/Post'

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

const SeriesPage = ({ posts }) => {
  const postList = posts.filter(post => post.frontmatter.categories !== null)

  const categories = postList
    .map(post => post.frontmatter.categories?.[0])
    .filter(unique)
    .filter(n => n)

  const slugifyCategory = category => slugify(category, { lower: true })

  const getPostsByCategory = category =>
    postList.filter(post => post.frontmatter.categories?.[0] === category)

  return (
    <>
      <NextSeo
        title="Series | Willian Justen"
        description="Aqui ficarão as series em que iremos abordar sobre determinados assuntos."
        openGraph={{
          images: [
            {
              url: 'https://willianjusten.com.br/assets/img/series-cover.png',
              width: 1200,
              height: 630,
              alt: 'Willian Justen Series'
            }
          ]
        }}
      />

      {categories.map((category, i) => (
        <section key={i}>
          <SeriesTitle id={slugifyCategory(category)}># {category}</SeriesTitle>

          {getPostsByCategory(category).map(post => (
            <Post
              key={post.slug}
              slug={post.slug}
              title={post.frontmatter.title}
              date={post.frontmatter.date}
              description={post.frontmatter.description}
              main_class={post.frontmatter.main_class}
              disableCard={true}
            />
          ))}
        </section>
      ))}
    </>
  )
}

export async function getStaticProps() {
  const posts = getAllPosts()

  return {
    props: {
      posts
    }
  }
}

export default SeriesPage
