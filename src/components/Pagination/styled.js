import styled from 'styled-components'
import media from 'styled-media-query'

export const PaginationWrapper = styled.section`
  align-items: center;
  color: ${props => props.theme.texts};
  display: flex;
  padding: 1.5rem 3rem;
  justify-content: space-between;

  ${media.lessThan('large')`
    font-size: .8rem;
    padding: 1rem;
  `}

  a {
    color: ${props => props.theme.texts};
    text-decoration: none;
    transition: color 0.5s;

    &:hover {
      color: ${props => props.theme.highlight};
    }
  }
`
