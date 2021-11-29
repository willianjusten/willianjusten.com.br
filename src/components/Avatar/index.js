import Image from 'next/image'

import * as S from './styled'

const Avatar = () => {
  return (
    <S.AvatarWrapper>
      <Image
        src="https://pbs.twimg.com/profile_images/1465351725305327620/z44BYn1t_400x400.jpg"
        alt="Uma foto minha vestido com o uniforme da Grifinória do Harry Potter"
        width={64}
        height={64}
      />
    </S.AvatarWrapper>
  )
}

export default Avatar
