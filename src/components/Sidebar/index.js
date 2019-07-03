import React from 'react'
import { Link } from 'gatsby'
import propTypes from 'prop-types'

import Profile from '../Profile'
import SocialLinks from '../SocialLinks'
import MenuLinks from '../MenuLinks'

import * as S from './styled'

const Sidebar = ({ site: { title, position, authorDescription } }) => (
  <S.SidebarContainer>
    <Link to="/">
      <Profile
        title={title}
        position={position}
        authorDescription={authorDescription}
      />
    </Link>
    <SocialLinks />
    <MenuLinks />
  </S.SidebarContainer>
)

Sidebar.propTypes = {
  site: propTypes.shape({
    title: propTypes.string.isRequired,
    position: propTypes.string.isRequired,
    authorDescription: propTypes.string.isRequired
  })
}

export default Sidebar
