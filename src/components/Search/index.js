import { SearchBox, Hits, Stats, Configure } from 'react-instantsearch-dom'

import Hit from './Hit'

import * as S from './styled'

const Search = () => {
  return (
    <S.SearchWrapper>
      <>
        <Configure hitsPerPage={200} distinct />
        <SearchBox
          translations={{ placeholder: 'Pesquisar...' }}
          autoFocus={true}
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
        <S.SearchTitle>
          Powered by Algolia
          <S.AlgoliaIcon />
        </S.SearchTitle>
      </>
    </S.SearchWrapper>
  )
}

export default Search
