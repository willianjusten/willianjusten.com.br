import React from 'react'
import propTypes from 'prop-types'

import AniLink from 'gatsby-plugin-transition-link/AniLink'
import getThemeColor from '../../utils/getThemeColor'

import * as S from './styled'

const Pagination = props => (
  <S.PaginationWrapper>
    {!props.isFirst && (
      <AniLink
        to={props.prevPage}
        rel="prev"
        cover
        direction="left"
        bg={getThemeColor()}
      >
        ← Página Anterior
      </AniLink>
    )}
    <p>
      {props.currentPage} de {props.numPages}
    </p>
    {!props.isLast && (
      <AniLink
        to={props.nextPage}
        rel="next"
        cover
        direction="right"
        bg={getThemeColor()}
      >
        Próxima Página →
      </AniLink>
    )}
  </S.PaginationWrapper>
)

Pagination.propTypes = {
  isFirst: propTypes.bool.isRequired,
  isLast: propTypes.bool.isRequired,
  currentPage: propTypes.number.isRequired,
  numPages: propTypes.number.isRequired,
  prevPage: propTypes.string.isRequired,
  nextPage: propTypes.string.isRequired
}

export default Pagination
