import styled from 'styled-components'

export const SidebarContainer = styled.aside`
  align-items: center;
  background: ${props => props.theme.mediumBackground};
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 2rem;
  text-align: center;
  width: 320px;

  p {
    color: ${props => props.theme.texts};
  }

  a {
    color: ${props => props.theme.texts};
    text-decoration: none;
    transition: color 0.5s;

    &:hover {
      color: ${props => props.theme.highlight};
    }
  }
`
