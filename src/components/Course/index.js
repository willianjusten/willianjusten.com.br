import * as S from './styled'

const Course = ({ title, description, link }) => {
  return (
    <S.CourseLink href={link}>
      <S.CourseWrapper>
        <S.CourseInfo>
          <S.CourseTitle>{title}</S.CourseTitle>
          <S.CourseDescription>{description}</S.CourseDescription>
        </S.CourseInfo>
      </S.CourseWrapper>
    </S.CourseLink>
  )
}

export default Course
