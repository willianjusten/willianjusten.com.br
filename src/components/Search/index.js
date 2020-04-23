import React from 'react'
import PropTypes from 'prop-types'

import algoliasearch from 'algoliasearch/lite'

import {
  InstantSearch,
  SearchBox,
  Hits,
  Stats,
  Configure
} from 'react-instantsearch-dom'

import Hit from './Hit'
import * as S from './styled'

const Search = (props) => {
  const searchClient = algoliasearch(
    props.algolia.appId,
    props.algolia.searchOnlyApiKey
  )

  return (
    <S.SearchWrapper>
      {props.algolia && props.algolia.appId && (
        <>
          <InstantSearch
            searchClient={searchClient}
            indexName={props.algolia.indexName}
          >
            <Configure hitsPerPage={200} distinct />
            <SearchBox
              autoFocus
              translations={{ placeholder: 'Pesquisar...' }}
            />
            <Stats
              translations={{
                stats(nbHits, timeSpentMS) {
                  return nbHits === 1
                    ? `${nbHits} resultado encontrado em ${timeSpentMS}ms`
                    : `${nbHits} resultados encontrados em ${timeSpentMS}ms`
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
