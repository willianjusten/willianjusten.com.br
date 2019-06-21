import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import SEO from '../components/seo'

const GIF_LIST = [
  'https://images.unsplash.com/gifs/fail/fail-1.gif',
  'https://images.unsplash.com/gifs/fail/fail-2.gif',
  'https://images.unsplash.com/gifs/fail/fail-3.gif',
  'https://images.unsplash.com/gifs/fail/fail-5.gif',
  'https://images.unsplash.com/gifs/fail/fail-6.gif',
  'https://images.unsplash.com/gifs/fail/fail-7.gif',
  'https://images.unsplash.com/gifs/fail/fail-9.gif',
  'https://images.unsplash.com/gifs/fail/fail-11.gif',
  'https://images.unsplash.com/gifs/fail/fail-12.gif',
  'https://images.unsplash.com/gifs/fail/fail-13.gif',
  'https://images.unsplash.com/gifs/fail/fail-14.gif',
  'https://images.unsplash.com/gifs/fail/fail-15.gif',
  'https://images.unsplash.com/gifs/fail/fail-16.gif',
  'https://images.unsplash.com/gifs/fail/fail-17.gif',
  'https://images.unsplash.com/gifs/fail/fail-18.gif',
  'https://images.unsplash.com/gifs/fail/fail-20.gif',
  'https://images.unsplash.com/gifs/fail/fail-21.gif',
  'https://images.unsplash.com/gifs/fail/fail-22.gif',
  'https://images.unsplash.com/gifs/weird/weird-1.gif',
  'https://images.unsplash.com/gifs/weird/weird-3.gif',
  'https://images.unsplash.com/gifs/weird/weird-4.gif',
  'https://images.unsplash.com/gifs/weird/weird-6.gif',
  'https://images.unsplash.com/gifs/weird/weird-8.gif',
  'https://images.unsplash.com/gifs/weird/weird-9.gif',
  'https://images.unsplash.com/gifs/weird/weird-10.gif',
  'https://images.unsplash.com/gifs/weird/weird-11.gif',
  'https://images.unsplash.com/gifs/weird/weird-12.gif',
  'https://images.unsplash.com/gifs/weird/weird-13.gif',
  'https://images.unsplash.com/gifs/weird/weird-14.gif',
  'https://images.unsplash.com/gifs/weird/weird-15.gif',
  'https://images.unsplash.com/gifs/weird/weird-16.gif'
]

const getGif = () => {
  return GIF_LIST[Math.floor(Math.random() * GIF_LIST.length)]
}

const Container = styled.section`
  align-items: center;
  background-image: url(${getGif});
  background-color: #111111;
  background-size: cover;
  background-position: center center;
  color: #fff;
  display: flex;
  font-family: -apple-system, BlinkMacSystemFont, 'San Francisco',
    'Helvetica Neue', Helvetica, Ubuntu, Roboto, Noto, 'Segoe UI', Arial,
    sans-serif;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  width: 100vw;
`

const Title = styled.h1`
  font-size: 80px;
  font-weight: bold;
  letter-spacing: 0.1em;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`

const Text = styled.p`
  font-family: Courier, monospace;
`

const Button = styled(Link)`
  border: 1px solid #fff;
  border-radius: 6px;
  color: #fff;
  font-size: 11px;
  font-weight: bold;
  letter-spacing: 0.06em;
  line-height: 32px;
  opacity: 0.6;
  padding: 0 10px;
  text-decoration: none;
  text-transform: uppercase;
  transition: opacity 0.4s;

  &:hover {
    opacity: 1;
  }
`

const NotFoundPage = () => (
  <Container>
    <SEO title="404: Not found" />
    <Title>404</Title>
    <Text>Ihhh, deu ruim...</Text>
    <Button>De volta ao blog!</Button>
  </Container>
)

export default NotFoundPage
