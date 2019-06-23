import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

const PostItem = ({ slug, date, title, description, main_class }) => {
  return (
    <Link to={slug}>
      <div className="post-list">
        <p>{main_class}</p>
        <p>{date}</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </Link>
  )
}

PostItem.propTypes = {
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  main_class: PropTypes.string.isRequired
}

export default PostItem
