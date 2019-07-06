import styled from 'styled-components'
import media from 'styled-media-query'

export const SidebarContainer = styled.aside`
  align-items: center;
  border-right: 1px solid var(--borders);
  background: var(--mediumBackground);
  display: flex;
  flex-direction: column;
  height: 100vh;
  min-width: 320px;
  padding: 2rem;
  text-align: center;
  width: 320px;

  ${media.lessThan('large')`
    align-items: flex-start;
    height: auto;
    padding: 1rem;
    width: 100%;
  `}

  p {
    color: var(--texts);
  }

  a {
    color: var(--texts);
    text-decoration: none;
    transition: color 0.5s;

    &:hover {
      color: var(--highlight);
    }
  }
`
