/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'

import GlobalStyles from '../../styles/global'
import Sidebar from '../Sidebar'

import * as S from './styled'

const Layout = ({ children }) => {
  const { site } = useStaticQuery(
    graphql`
      query SiteTitleQuery {
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
      <Sidebar site={site.siteMetadata} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0px 1.0875rem 1.45rem`,
          paddingTop: 0
        }}
      >
        <main>{children}</main>
      </div>
    </S.LayoutWrapper>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
