import Image from 'next/image'

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

export default Course
