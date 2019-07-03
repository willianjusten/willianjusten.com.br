import styled from 'styled-components'

export const LayoutWrapper = styled.section`
  display: flex;
`

export const LayoutMain = styled.main`
  background: ${props => props.theme.background};
  height: 100vh;
  overflow-y: scroll;
  width: 100%;
`
