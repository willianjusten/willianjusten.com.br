import React from 'react'
import { Link } from 'gatsby'
import ReactGA from 'react-ga'

import links from './content'
import * as S from './styled'

const menuLinkClickTrack = (link) => {
  ReactGA.event({
    category: 'menu link',
    action: 'click',
    label: link
  })
}

const MenuLinks = () => (
  <S.MenuLinksWrapper>
    <S.MenuLinksList>
      {links.map((link, i) => (
        <S.MenuLinksItem key={i}>
          <Link to={link.url} onClick={() => menuLinkClickTrack(link.label)}>{link.label}</Link>
        </S.MenuLinksItem>
      ))}
      <S.MenuLinksItem>
        <a href="/feed.rss">Feed RSS</a>
      </S.MenuLinksItem>
    </S.MenuLinksList>
  </S.MenuLinksWrapper>
)

export default MenuLinks
