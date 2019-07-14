import React from 'react'
import PropTypes from 'prop-types'
import ReactDisqusComments from 'react-disqus-comments'
import LazyLoad from 'react-lazy-load'

import * as S from './styled'

const Comments = ({ url, title }) => {
  const completeURL = `https://willianjusten.com.br${url}`

  return (
    <S.CommentsWrapper>
      <S.CommentsTitle>Comentários</S.CommentsTitle>
      <LazyLoad offsetTop={400}>
        <ReactDisqusComments
          shortname="willianjusten"
          identifier={completeURL}
          title={title}
          url={completeURL}
        />
      </LazyLoad>
    </S.CommentsWrapper>
  )
}

Comments.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

export default Comments
