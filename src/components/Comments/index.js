import React from 'react'
import ReactDisqusComments from 'react-disqus-comments'
import PropTypes from 'prop-types'

import * as S from './styled'

const Comments = ({ url, title }) => {
  const completeURL = `https://willianjusten.com.br${url}`

  return (
    <S.CommentsWrapper>
      <S.CommentsTitle>Comentários</S.CommentsTitle>
      <ReactDisqusComments
        className="lazyload"
        shortname="willianjusten"
        identifier={completeURL}
        title={title}
        url={completeURL}
      />
    </S.CommentsWrapper>
  )
}

Comments.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

export default Comments
