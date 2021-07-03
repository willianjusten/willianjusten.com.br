import { useState } from 'react'
import PropTypes from 'prop-types'

import Profile from 'components/Profile'
import Sidebar from 'components/Sidebar'
import MenuBar from 'components/MenuBar'

import config from '../../config'

import * as S from './styled'

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <S.LayoutWrapper>
      <Profile
        title={config.author.name}
        position={config.author.position}
        authorDescription={config.author.description}
        isMobileHeader={true}
      />
      <Sidebar
        site={config}
        setIsMenuOpen={setIsMenuOpen}
        isMenuOpen={isMenuOpen}
      />
      <S.LayoutMain>{children}</S.LayoutMain>
      <MenuBar setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} />
    </S.LayoutWrapper>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
