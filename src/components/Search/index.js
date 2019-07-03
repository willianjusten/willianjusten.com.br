import React from 'react'
import PropTypes from 'prop-types'

import {
  InstantSearch,
  SearchBox,
  Hits,
  Stats,
  Configure
} from 'react-instantsearch-dom'

import Hit from './Hit'

const Search = props => {
  const { algolia } = props

  return (
    <div>
      {algolia && algolia.appId && (
        <InstantSearch
          appId={algolia.appId}
          apiKey={algolia.searchOnlyApiKey}
          indexName={algolia.indexName}
        >
          <Configure hitsPerPage={200} distinct />
          <SearchBox translations={{ placeholder: 'Search' }} />
          <Stats />
          <Hits hitComponent={Hit} />
        </InstantSearch>
      )}
    </div>
  )
}

Search.propTypes = {
  algolia: PropTypes.object.isRequired
}

export default Search
