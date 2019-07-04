import styled from 'styled-components'
import media from 'styled-media-query'
import { Link } from 'gatsby'

export const PostWrapper = styled.section`
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.borders};
  display: flex;
  padding: 2rem 3rem;
  width: 100%;

  ${media.lessThan('large')`
    align-items: flex-start;
    flex-direction: column;
    padding: 2rem 1rem;
  `}
`

export const PostLink = styled(Link)`
  color: ${props => props.theme.texts};
  display: flex;
  text-decoration: none;
  transition: color 0.5s;

  &:hover {
    color: ${props => props.theme.highlight};
  }
`

export const PostTag = styled.div`
  align-items: center;
  background: ${props => props.theme.highlight};
  border-radius: 50%;
  color: ${props => props.theme.white};
  display: flex;
  font-size: 1.3rem;
  font-weight: 700;
  justify-content: center;
  min-height: 90px;
  min-width: 90px;
  text-transform: uppercase;

  ${media.lessThan('large')`
    border-radius: 0;
    font-size: 1rem;
    min-height: auto;
    min-width: auto;
    padding: .2rem .5rem;
    margin-bottom: .7rem;
  `}

  &.is-js {
    background: #d6ba32;
  }

  &.is-misc {
    background: #7aab13;
  }

  &.is-dev {
    background: #637a91;
  }

  &.is-svg {
    background: #7d669e;
  }

  &.is-css {
    background: #2da0c3;
  }

  &.is-jekyll {
    background: #b31917;
  }
`

export const PostInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1.5rem;

  ${media.lessThan('large')`
    margin: 0;
  `}
`

export const PostDate = styled.time`
  font-size: 0.9rem;
`

export const PostTitle = styled.h1`
  font-size: 1.6rem;
  font-weight: 700;
  margin: 0.2rem 0 0.5rem;
`

export const PostDescription = styled.h2`
  font-size: 1.2rem;
  font-weight: 300;
  line-height: 1.2;
`
