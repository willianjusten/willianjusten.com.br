import styled from 'styled-components'
import media from 'styled-media-query'
import { Algolia } from '@styled-icons/fa-brands/Algolia'

export const SearchWrapper = styled.section`
  background: var(--background);
  display: flex;
  flex-direction: column;
  width: 100%;
  transition: opacity 0.4s;

  .ais-InstantSearch__root {
    display: flex;
    flex-direction: column;
    height: auto;
    width: 100%;
  }

  .ais-SearchBox,
  .ais-Stats {
    padding: 0.5rem 3rem;

    ${media.lessThan('large')`
      padding: 0.5rem 1rem;
    `}
  }

  .ais-SearchBox {
    padding-top: 6rem;

    ${media.lessThan('large')`
      padding-top: 1rem;
    `}
  }

  .ais-Stats {
    color: var(--texts);
  }

  .ais-SearchBox-input {
    background: none;
    border: none;
    border-bottom: 1px solid var(--borders);
    color: var(--texts);
    display: flex;
    font-size: 1.6rem;
    padding: 0.5rem;
    width: 100%;

    &::placeholder {
      color: var(--texts);
    }
  }

  .ais-SearchBox-submit,
  .ais-SearchBox-reset {
    display: none;
  }
`

export const SearchTitle = styled.h1`
  color: var(--texts);
  font-size: 1rem;
  font-weight: 700;
  padding: 3rem 2rem;
  text-align: right;

  ${media.lessThan('large')`
    padding: 1rem;
    line-height: 1.1;
  `}
`

export const AlgoliaIcon = styled(Algolia)`
  height: 1.2rem;
  margin-left: 0.5rem;
  width: 1.2rem;
`
