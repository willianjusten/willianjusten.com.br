import { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import Post from 'components/Post'
import { NextSeo } from 'next-seo'

const BlogList = ({ posts }) => {
  const sortedPosts = posts.sort((post1, post2) =>
    new Date(post1.date) > new Date(post2.date) ? -1 : 1
  )

  const [count, setCount] = useState({
    prev: 0,
    next: 10
  })
  const [hasMore, setHasMore] = useState(true)
  const [current, setCurrent] = useState(
    sortedPosts.slice(count.prev, count.next)
  )

  const getMoreData = () => {
    if (current.length === sortedPosts.length) {
      setHasMore(false)
      return
    }

    setCurrent(
      current.concat(sortedPosts.slice(count.prev + 10, count.next + 10))
    )

    setCount(prevState => ({
      prev: prevState.prev + 10,
      next: prevState.next + 10
    }))
  }

  return (
    <>
      <NextSeo
        title="Home | Willian Justen"
        description="Um blog de um desenvolvedor Front End, fã de SVG, Javascript, React e novas tecnologias. Nômade Digital, instrutor na Udemy e viajando o mundo."
        openGraph={{
          images: [
            {
              url: 'https://willianjusten.com.br/assets/img/blog-cover.png',
              width: 1200,
              height: 630,
              alt: 'Willian Justen Blog'
            }
          ]
        }}
      />
      <InfiniteScroll
        dataLength={current.length}
        next={getMoreData}
        hasMore={hasMore}
      >
        {current.map((post, i) => (
          <Post
            key={i}
            slug={post.slug}
            title={post.frontmatter.title}
            timeToRead={post.timeToRead}
            date={post.frontmatter.date}
            description={post.frontmatter.description}
            main_class={post.frontmatter['main-class']}
          />
        ))}
      </InfiniteScroll>
    </>
  )
}

export default BlogList
