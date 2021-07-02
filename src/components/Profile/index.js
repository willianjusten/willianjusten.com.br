import React from 'react'
import PropTypes from 'prop-types'

import Avatar from 'components/Avatar'
import * as S from './styled'

const Profile = ({ title, position, authorDescription, isMobileHeader }) => {
  return (
    <S.ProfileContainer isMobileHeader={isMobileHeader}>
      <S.ProfileLink href="/">
        <a>
          <Avatar />
          <S.ProfileAuthor>
            {title}
            <S.ProfilePosition>{position}</S.ProfilePosition>
          </S.ProfileAuthor>
        </a>
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
