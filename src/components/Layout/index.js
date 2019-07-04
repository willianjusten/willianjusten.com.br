import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'

import GlobalStyles from '../../styles/global'
import Sidebar from '../Sidebar'
import MenuBar from '../MenuBar'

import { ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme } from '../../styles/theme'

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

  const windowGlobal = typeof window !== 'undefined' && window
  const stored = windowGlobal.localStorage.getItem('isLightMode')

  const [isLightMode, setIsLightMode] = useState(
    stored === 'true' ? true : false
  )

  const setLightMode = () => {
    setIsLightMode(!isLightMode)
    windowGlobal.localStorage.setItem('isLightMode', !isLightMode)
  }

  return (
    <ThemeProvider theme={isLightMode ? lightTheme : darkTheme}>
      <S.LayoutWrapper>
        <GlobalStyles />
        <Sidebar site={site.siteMetadata} />
        <S.LayoutMain>{children}</S.LayoutMain>
        <MenuBar setLightMode={setLightMode} />
      </S.LayoutWrapper>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
