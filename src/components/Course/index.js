import React from 'react'
import PropTypes from 'prop-types'

import Image from './Image'
import * as S from './styled'

const Course = ({ title, description, link, image }) => {
  return (
    <S.CourseLink to={link}>
      <S.CourseWrapper>
        <Image filename={image} alt={title} />
        <S.CourseInfo>
          <S.CourseTitle>{title}</S.CourseTitle>
          <S.CourseDescription>{description}</S.CourseDescription>
        </S.CourseInfo>
      </S.CourseWrapper>
    </S.CourseLink>
  )
}

Course.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired
}

export default Course
