import Link from 'next/link'

import Avatar from 'components/Avatar'

import * as S from './styled'

const Profile = ({ title, position, authorDescription, isMobileHeader }) => {
  return (
    <S.ProfileContainer isMobileHeader={isMobileHeader}>
      <Link href="/" passHref>
        <S.ProfileLink>
          <Avatar />
          <S.ProfileAuthor>
            {title}
            <S.ProfilePosition>{position}</S.ProfilePosition>
          </S.ProfileAuthor>
        </S.ProfileLink>
      </Link>
      <S.ProfileDescription>{authorDescription}</S.ProfileDescription>
    </S.ProfileContainer>
  )
}

export default Profile
