import { Link } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'

export const ImageWrapper = styled(Img)`
  border-radius: 50%;
  display: flex;
  width: 120px;
  height: 120px;
`

export const CourseWrapper = styled.section`
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.borders};
  display: flex;
  padding: 2rem 3rem;
  width: 100%;
`

export const CourseLink = styled(Link)`
  color: ${props => props.theme.texts};
  display: flex;
  text-decoration: none;
  transition: color 0.5s;

  &:hover {
    color: ${props => props.theme.highlight};
  }
`

export const CourseInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1.5rem;
`

export const CourseTitle = styled.h1`
  font-size: 1.6rem;
  font-weight: 700;
  margin: 0.2rem 0 0.5rem;
`

export const CourseDescription = styled.h2`
  font-size: 1.2rem;
  font-weight: 300;
  line-height: 1.2;
`
