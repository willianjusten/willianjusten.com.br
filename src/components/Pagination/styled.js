import styled from 'styled-components'

export const PaginationWrapper = styled.section`
  align-items: center;
  color: ${props => props.theme.texts};
  display: flex;
  padding: 1.5rem 3rem;
  justify-content: space-between;

  a {
    color: ${props => props.theme.texts};
    text-decoration: none;
    transition: color 0.5s;

    &:hover {
      color: ${props => props.theme.highlight};
    }
  }
`
