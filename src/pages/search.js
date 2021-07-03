import { NextSeo } from 'next-seo'
import Search from 'components/Search'

const algolia = {
  appId: process.env.GATSBY_ALGOLIA_APP_ID,
  searchOnlyApiKey: process.env.GATSBY_ALGOLIA_SEARCH_ONLY_KEY,
  indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME
}

const SearchPage = () => {
  return (
    <>
      <NextSeo
        title="Search"
        description="Vai lá, não tenha medo. Busque por posts novos e bem antigos."
      />
      <Search algolia={algolia} />
    </>
  )
}

export default SearchPage
