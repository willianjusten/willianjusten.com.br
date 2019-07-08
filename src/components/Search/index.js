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
import * as S from './styled'

const Search = props => {
  const { algolia } = props

  return (
    <S.SearchWrapper>
      {algolia && algolia.appId && (
        <>
          <InstantSearch
            appId={algolia.appId}
            apiKey={algolia.searchOnlyApiKey}
            indexName={algolia.indexName}
          >
            <Configure hitsPerPage={200} distinct />
            <SearchBox
              autoFocus
              translations={{ placeholder: 'Pesquisar...' }}
            />
            <Stats
              translations={{
                stats(nbHits, timeSpentMS) {
                  return `${nbHits} resultados encontrados em ${timeSpentMS}ms`
                }
              }}
            />
            <Hits hitComponent={Hit} />
          </InstantSearch>
          <S.SearchTitle>
            Powered by Algolia
            <S.AlgoliaIcon />
          </S.SearchTitle>
        </>
      )}
    </S.SearchWrapper>
  )
}

Search.propTypes = {
  algolia: PropTypes.object.isRequired
}

export default Search
