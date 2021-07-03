import React from 'react'

import Profile from 'components/Profile'
import SocialLinks from 'components/SocialLinks'
import MenuLinks from 'components/MenuLinks'

import * as S from './styled'

const Sidebar = ({
  site: { title, position, authorDescription },
  isMenuOpen,
  setIsMenuOpen
}) => (
  <S.SidebarContainer isMenuOpen={isMenuOpen}>
    <Profile
      title={title}
      position={position}
      authorDescription={authorDescription}
      isMobileHeader={false}
    />
    <S.SidebarLinksContainer>
      <SocialLinks />
      <MenuLinks setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} />
    </S.SidebarLinksContainer>
  </S.SidebarContainer>
)

export default Sidebar
