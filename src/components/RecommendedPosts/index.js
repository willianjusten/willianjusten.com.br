import React from 'react'
import propTypes from 'prop-types'
import ReactGA from 'react-ga'

import * as S from './styled'

import getThemeColor from '../../utils/getThemeColor'

const RecommendedClickTrack = () => {
  ReactGA.event({
    category: 'menu link',
    action: 'click',
    label: 'Clicou num recommended link'
  })
}

const RecommendedPosts = ({ next, previous }) => (
  <S.RecommendedWrapper>
    {previous && (
      <S.RecommendedLink
        to={previous.fields.slug}
        cover
        direction="left"
        bg={getThemeColor()}
        className="previous"
        onClick={() => RecommendedClickTrack()}
      >
        {previous.frontmatter.title}
      </S.RecommendedLink>
    )}
    {next && (
      <S.RecommendedLink
        to={next.fields.slug}
        cover
        direction="right"
        bg={getThemeColor()}
        className="next"
        onClick={() => RecommendedClickTrack()}
      >
        {next.frontmatter.title}
      </S.RecommendedLink>
    )}
  </S.RecommendedWrapper>
)

RecommendedPosts.propTypes = {
  next: propTypes.shape({
    frontmatter: propTypes.shape({
      title: propTypes.string.isRequired
    }),
    fields: propTypes.shape({
      slug: propTypes.string.isRequired
    })
  }),
  previous: propTypes.shape({
    frontmatter: propTypes.shape({
      title: propTypes.string.isRequired
    }),
    fields: propTypes.shape({
      slug: propTypes.string.isRequired
    })
  })
}

export default RecommendedPosts
