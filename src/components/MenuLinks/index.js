import Link from 'next/link'
import ReactGA from 'react-ga'

import links from './content'
import * as S from './styled'

const MenuLinks = ({ setIsMenuOpen, isMenuOpen }) => {
  const menuLinkClickTrack = link => {
    setIsMenuOpen(!isMenuOpen)

    ReactGA.event({
      category: 'menu link',
      action: 'click',
      label: `Menu Link - ${link}`
    })
  }

  return (
    <S.MenuLinksWrapper>
      <S.MenuLinksList>
        {links.map((link, i) => (
          <S.MenuLinksItem key={i}>
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
