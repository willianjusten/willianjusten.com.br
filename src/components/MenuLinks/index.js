import Link from 'next/link'

import links from './content'

import * as S from './styled'

const MenuLinks = ({ setIsMenuOpen, isMenuOpen }) => {
  const menuLinkClick = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <S.MenuLinksWrapper>
      <S.MenuLinksList>
        {links.map((link, i) => (
          <S.MenuLinksItem key={i} onClick={menuLinkClick}>
            <Link href={link.url}>
              <a>{link.label}</a>
            </Link>
          </S.MenuLinksItem>
        ))}
      </S.MenuLinksList>
    </S.MenuLinksWrapper>
  )
}

export default MenuLinks
