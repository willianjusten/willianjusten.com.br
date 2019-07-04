import React from 'react'
import { Link } from 'gatsby'

import { Home } from 'styled-icons/boxicons-solid/Home'
import { SearchAlt2 as Search } from 'styled-icons/boxicons-regular/SearchAlt2'
import { UpArrowAlt as Arrow } from 'styled-icons/boxicons-regular/UpArrowAlt'
import { LightbulbOutline as Light } from 'styled-icons/material/LightbulbOutline'
import { GraduationCap } from 'styled-icons/fa-solid/GraduationCap'

import * as S from './styled'

const MenuBar = () => (
  <S.MenuBarWrapper>
    <S.MenuBarGroup>
      <Link to="/" title="Voltar para Home">
        <S.MenuBarItem>
          <Home />
        </S.MenuBarItem>
      </Link>
      <Link to="/search" title="Search">
        <S.MenuBarItem>
          <Search />
        </S.MenuBarItem>
      </Link>
      <Link to="/cursos" title="Cursos">
        <S.MenuBarItem>
          <GraduationCap />
          <S.MenuBarNotification />
        </S.MenuBarItem>
      </Link>
    </S.MenuBarGroup>

    <S.MenuBarGroup>
      <S.MenuBarItem>
        <Light />
      </S.MenuBarItem>
      <S.MenuBarItem onClick={() => window.scrollTo(0, 0)}>
        <Arrow />
      </S.MenuBarItem>
    </S.MenuBarGroup>
  </S.MenuBarWrapper>
)

export default MenuBar
