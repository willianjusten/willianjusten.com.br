import React from 'react'
import Image from 'next/image'

import avatarImage from '../../../public/assets/img/profile-photo-harry.jpg'

import * as S from './styled'

const Avatar = () => {
  return (
    <S.AvatarWrapper>
      <Image
        src={avatarImage}
        alt="John Doe Avatar"
        width={400}
        height={400}
        placeholder="blur"
      />
    </S.AvatarWrapper>
  )
}

export default Avatar
