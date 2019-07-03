import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import * as S from './styled'

const Post = ({ slug, date, title, description, main_class }) => {
  return (
    <S.PostWrapper>
      <Link to={slug}>
        <div className="post-list">
          <p>{main_class}</p>
          <p>{date}</p>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </Link>
    </S.PostWrapper>
  )
}

Post.propTypes = {
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  main_class: PropTypes.string.isRequired
}

export default Post
