import {
  BLOG_AUTHOR,
  BLOG_AUTHOR_DESCRIPTION,
  BLOG_AUTHOR_POSITION
} from 'lib/constants'

import Profile from 'components/Profile'
import SocialLinks from 'components/SocialLinks'
import MenuLinks from 'components/MenuLinks'

import * as S from './styled'

const Sidebar = ({ isMenuOpen, setIsMenuOpen }) => (
  <S.SidebarContainer isMenuOpen={isMenuOpen}>
    <Profile
      title={BLOG_AUTHOR}
      position={BLOG_AUTHOR_POSITION}
      authorDescription={BLOG_AUTHOR_DESCRIPTION}
      isMobileHeader={false}
    />
    <S.SidebarLinksContainer>
      <SocialLinks />
      <MenuLinks setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} />
    </S.SidebarLinksContainer>
  </S.SidebarContainer>
)

export default Sidebar
