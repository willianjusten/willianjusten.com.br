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
  height: 100vh;
  overflow-y: scroll;
  width: 100%;
`
