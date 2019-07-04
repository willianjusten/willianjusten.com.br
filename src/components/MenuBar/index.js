import React from 'react'

import { Home } from 'styled-icons/boxicons-solid/Home'
import { SearchAlt2 as Search } from 'styled-icons/boxicons-regular/SearchAlt2'
import { UpArrowAlt as Arrow } from 'styled-icons/boxicons-regular/UpArrowAlt'
import { LightbulbOutline as Light } from 'styled-icons/material/LightbulbOutline'
import { GraduationCap } from 'styled-icons/fa-solid/GraduationCap'

import * as S from './styled'

const MenuBar = () => (
  <S.MenuBarWrapper>
    <S.MenuBarGroup>
      <S.MenuBarLink to="/" title="Voltar para Home">
        <Home />
      </S.MenuBarLink>
      <S.MenuBarLink to="/search" title="Search">
        <Search />
      </S.MenuBarLink>
      <S.MenuBarLink to="/cursos" title="Cursos">
        <GraduationCap />
        <S.MenuBarNotification />
      </S.MenuBarLink>
    </S.MenuBarGroup>

    <S.MenuBarGroup>
      <S.MenuBarLink to="#top" title="Mudar de tema">
        <Light />
      </S.MenuBarLink>
      <S.MenuBarLink to="#top" title="Voltar para o topo">
        <Arrow />
      </S.MenuBarLink>
    </S.MenuBarGroup>
  </S.MenuBarWrapper>
)

export default MenuBar
