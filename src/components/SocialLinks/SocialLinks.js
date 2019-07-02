import React from 'react'

import links from './content'
import Icons from './Icons'

import * as S from './SocialLinks.styled'

const SocialLinks = () => (
  <ul>
    {links.map((link, i) => {
      const Icon = Icons[link.label]

      return (
        <li key={i}>
          <a href={link.url} title={link.label}>
            <S.IconWrapper>
              <Icon />
            </S.IconWrapper>
          </a>
        </li>
      )
    })}
  </ul>
)

export default SocialLinks
