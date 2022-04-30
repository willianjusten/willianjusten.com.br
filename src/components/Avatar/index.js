import Image from 'next/image'

import * as S from './styled'

const Avatar = () => {
  return (
    <S.AvatarWrapper>
      <Image
        src="https://github.com/willianjusten.png"
        alt="Uma foto minha vestido com o uniforme da Grifinória do Harry Potter"
        width={64}
        height={64}
      />
    </S.AvatarWrapper>
  )
}

export default Avatar
