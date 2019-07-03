import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Avatar from './Avatar'

// ToDo: Create the proper styles obviously :)
const ProfileContainer = styled.section`
  display: flex;
  flex-direction: column;
`

const ProfileAuthor = styled.h1`
  font-size: 1.6rem;
`

const ProfilePosition = styled.small`
  display: block;
  font-size: 0.6rem;
`

const ProfileDescription = styled.p`
  font-size: 0.9rem;
`

const Profile = ({ title, position, authorDescription }) => {
  return (
    <ProfileContainer>
      <Avatar />
      <ProfileAuthor>
        {title}
        <ProfilePosition>{position}</ProfilePosition>
      </ProfileAuthor>
      <ProfileDescription>{authorDescription}</ProfileDescription>
    </ProfileContainer>
  )
}

Profile.propTypes = {
  title: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  authorDescription: PropTypes.string.isRequired
}

export default Profile
