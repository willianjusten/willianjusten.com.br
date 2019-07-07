import React from 'react'
import PropTypes from 'prop-types'

import * as S from './styled'

import getThemeColor from '../../utils/getThemeColor'

const Post = ({ slug, date, title, description, main_class }) => {
  return (
    <S.PostLink to={slug} cover direction="right" bg={getThemeColor()}>
      <S.PostWrapper>
        {main_class && (
          <S.PostTag className={`is-${main_class}`}>{main_class}</S.PostTag>
        )}
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
  main_class: PropTypes.string
}

export default Post
