import styled from 'styled-components'
import media from 'styled-media-query'

export const AvatarWrapper = styled.div`
  img {
    border-radius: 50%;
  }
  height: 4rem;
  margin: auto;
  width: 4rem;

  ${media.lessThan('large')`
    height: 2rem;
    width: 2rem;
  `}
`
