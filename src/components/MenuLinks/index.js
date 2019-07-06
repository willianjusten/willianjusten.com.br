import React from 'react'
import AniLink from 'gatsby-plugin-transition-link/AniLink'
import ReactGA from 'react-ga'

import links from './content'
import * as S from './styled'

import getThemeColor from '../../utils/getThemeColor'

const menuLinkClickTrack = link => {
  ReactGA.event({
    category: 'menu link',
    action: 'click',
    label: link
  })
}

const MenuLinks = () => {
  return (
    <S.MenuLinksWrapper>
      <S.MenuLinksList>
        {links.map((link, i) => (
          <S.MenuLinksItem key={i}>
            <AniLink
              cover
              direction="left"
              bg={getThemeColor()}
              duration={0.6}
              to={link.url}
              onClick={() => menuLinkClickTrack(link.label)}
            >
              {link.label}
            </AniLink>
          </S.MenuLinksItem>
        ))}
        <S.MenuLinksItem>
          <a href="/feed.rss">Feed RSS</a>
        </S.MenuLinksItem>
      </S.MenuLinksList>
    </S.MenuLinksWrapper>
  )
}

export default MenuLinks
