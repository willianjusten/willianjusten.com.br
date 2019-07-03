import React from 'react'
import { Link } from 'gatsby'
import propTypes from 'prop-types'

import Profile from '../Profile'
import SocialLinks from '../SocialLinks/SocialLinks'
import MenuLinks from '../MenuLinks/MenuLinks'

import * as S from './Sidebar.styled'

const Sidebar = ({ site: { title, position, description } }) => (
  <S.SidebarContainer>
    <Link to="/">
      <Profile title={title} position={position} description={description} />
    </Link>
    <SocialLinks />
    <MenuLinks />
  </S.SidebarContainer>
)

Sidebar.propTypes = {
  site: propTypes.shape({
    title: propTypes.string.isRequired,
    position: propTypes.string.isRequired,
    description: propTypes.string.isRequired
  })
}

export default Sidebar
