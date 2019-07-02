import React from 'react'
import propTypes from 'prop-types'

import { Link } from 'gatsby'

const Pagination = props => (
  <div className="pagination">
    {!props.isFirst && (
      <Link to={props.prevPage} rel="prev">
        ← Previous Page
      </Link>
    )}
    <p>
      {props.currentPage} de {props.numPages}
    </p>
    {!props.isLast && (
      <Link to={props.nextPage} rel="next">
        Next Page →
      </Link>
    )}
  </div>
)

Pagination.propTypes = {
  isFirst: propTypes.bool,
  isLast: propTypes.bool,
  currentPage: propTypes.number.isRequired,
  numPages: propTypes.number.isRequired,
  prevPage: propTypes.number,
  nextPage: propTypes.number
}

export default Pagination
