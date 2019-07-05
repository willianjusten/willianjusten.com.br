import styled from 'styled-components'
import media from 'styled-media-query'

export const LayoutWrapper = styled.section`
  display: flex;

  ${media.lessThan('large')`
    flex-direction: column;
  `}
`

export const LayoutMain = styled.main`
  background: ${props => props.theme.background};
  width: 100%;
  overflow-y: scroll;
  height: 100vh;
  transition: background 0.5s, color 0.5s;

  ${media.lessThan('large')`
    overflow-y: auto;
    /* removing the height of the two bars */
    height: auto;
  `}
`
