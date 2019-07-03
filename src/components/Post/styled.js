import styled from 'styled-components'
import { Link } from 'gatsby'

export const PostWrapper = styled.section`
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.borders};
  display: flex;
  padding: 2rem 3rem;
  width: 100%;
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
  font-size: 1.6rem;
  font-weight: 700;
  min-height: 90px;
  justify-content: center;
  min-width: 90px;
`

export const PostInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1.5rem;
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
