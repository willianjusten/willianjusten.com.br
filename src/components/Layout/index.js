import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'

import { TransitionPortal } from 'gatsby-plugin-transition-link'

import GlobalStyles from '../../styles/global'
import Profile from '../Profile'
import Sidebar from '../Sidebar'
import MenuBar from '../MenuBar'

import * as S from './styled'

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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
    <S.LayoutWrapper>
      <GlobalStyles />
      <TransitionPortal level="top">
        <Profile
          title={site.siteMetadata.title}
          position={site.siteMetadata.position}
          authorDescription={site.siteMetadata.authorDescription}
          isMobileHeader={true}
        />
        <Sidebar
          site={site.siteMetadata}
          setIsMenuOpen={setIsMenuOpen}
          isMenuOpen={isMenuOpen}
        />
      </TransitionPortal>
      <S.LayoutMain>{children}</S.LayoutMain>
      <TransitionPortal level="top">
        <MenuBar setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} />
      </TransitionPortal>
    </S.LayoutWrapper>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
