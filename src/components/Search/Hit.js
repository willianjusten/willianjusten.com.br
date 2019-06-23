import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

const Hit = props => {
  const { hit } = props

  return <Link to={hit.fields.slug}>{hit.title}</Link>
}

Hit.propTypes = {
  hit: PropTypes.object.isRequired
}

export default Hit
