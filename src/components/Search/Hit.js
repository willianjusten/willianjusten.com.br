import React from 'react'
import PropTypes from 'prop-types'

import Post from '../Post'

const Hit = props => {
  const { hit } = props

  return (
    <Post
      slug={hit.fields.slug}
      title={hit.title}
      date={hit.date}
      description={hit.description}
      main_class={hit.main_class}
    />
  )
}

Hit.propTypes = {
  hit: PropTypes.object.isRequired
}

export default Hit
