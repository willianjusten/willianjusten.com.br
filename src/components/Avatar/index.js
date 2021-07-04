import Image from 'next/image'
import avatarImage from '../../../public/assets/img/profile-photo-harry.jpg'

import * as S from './styled'

const Avatar = () => {
  return (
    <S.AvatarWrapper>
      <Image
        src={avatarImage}
        alt="Uma foto minha vestido com o uniforme da Grifinória do Harry Potter"
        width={64}
        height={64}
        placeholder="blur"
      />
    </S.AvatarWrapper>
  )
}

export default Avatar
