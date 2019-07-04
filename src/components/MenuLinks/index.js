import React from 'react'
import { Link } from 'gatsby'

import links from './content'
import * as S from './styled'

const MenuLinks = () => (
  <S.MenuLinksWrapper>
    <S.MenuLinksList>
      {links.map((link, i) => (
        <S.MenuLinksItem key={i}>
          <Link to={link.url}>{link.label}</Link>
        </S.MenuLinksItem>
      ))}
      <S.MenuLinksItem>
        <a href="/feed.rss">Feed RSS</a>
      </S.MenuLinksItem>
    </S.MenuLinksList>
  </S.MenuLinksWrapper>
)

export default MenuLinks
