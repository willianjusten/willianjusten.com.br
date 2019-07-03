import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'

import GlobalStyles from '../../styles/global'
import Sidebar from '../Sidebar'

import { ThemeProvider } from 'styled-components'
import { darkTheme } from '../../styles/theme'

import * as S from './styled'

const Layout = ({ children }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            position
            description
            authorDescription
          }
        }
      }
    `
  )

  return (
    <ThemeProvider theme={darkTheme}>
      <S.LayoutWrapper>
        <GlobalStyles />
        <Sidebar site={site.siteMetadata} />
        <S.LayoutMain>{children}</S.LayoutMain>
      </S.LayoutWrapper>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
