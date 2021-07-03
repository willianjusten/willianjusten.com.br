import Image from 'next/image'
import PropTypes from 'prop-types'

import * as S from './styled'

const Course = ({ title, description, link, image }) => {
  return (
    <S.CourseLink href={link}>
      <S.CourseWrapper>
        <S.ImageWrapper>
          <Image
            src={`/assets/img/cursos/${image}`}
            alt={title}
            height={120}
            width={120}
            objectFit="cover"
          />
        </S.ImageWrapper>
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
