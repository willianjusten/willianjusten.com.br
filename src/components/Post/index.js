import React from 'react'
import PropTypes from 'prop-types'

import * as S from './styled'

const Post = ({ slug, date, title, description, main_class }) => {
  return (
    <S.PostLink to={slug}>
      <S.PostWrapper>
        <S.PostTag>{main_class}</S.PostTag>
        <S.PostInfo>
          <S.PostDate>{date}</S.PostDate>
          <S.PostTitle>{title}</S.PostTitle>
          <S.PostDescription>{description}</S.PostDescription>
        </S.PostInfo>
      </S.PostWrapper>
    </S.PostLink>
  )
}

Post.propTypes = {
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  main_class: PropTypes.string.isRequired
}

export default Post
