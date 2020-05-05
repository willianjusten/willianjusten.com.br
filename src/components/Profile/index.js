import React from 'react'
import PropTypes from 'prop-types'

import Avatar from '../Avatar'
import * as S from './styled'

import getThemeColor from '../../utils/getThemeColor'

const Profile = ({ title, position, authorDescription, isMobileHeader }) => {
  return (
    <S.ProfileContainer isMobileHeader={isMobileHeader}>
      <S.ProfileLink
        to="/"
        cover
        direction="left"
        bg={getThemeColor()}
        duration={0.6}
      >
        <Avatar />
        <S.ProfileAuthor>
          {title}
          <S.ProfilePosition>{position}</S.ProfilePosition>
        </S.ProfileAuthor>
      </S.ProfileLink>
      <S.ProfileDescription>{authorDescription}</S.ProfileDescription>
    </S.ProfileContainer>
  )
}

Profile.propTypes = {
  title: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  authorDescription: PropTypes.string.isRequired
}

export default Profile
