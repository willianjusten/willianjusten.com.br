import React, { useState, useEffect } from 'react'
import AniLink from 'gatsby-plugin-transition-link/AniLink'

import { Home } from 'styled-icons/boxicons-solid/Home'
import { SearchAlt2 as Search } from 'styled-icons/boxicons-regular/SearchAlt2'
import { UpArrowAlt as Arrow } from 'styled-icons/boxicons-regular/UpArrowAlt'
import { LightbulbOutline as Light } from 'styled-icons/material/LightbulbOutline'
import { GraduationCap } from 'styled-icons/fa-solid/GraduationCap'

import getThemeColor from '../../utils/getThemeColor'

import * as S from './styled'
import * as GA from './trackers'

const MenuBar = () => {
  const [theme, setTheme] = useState(null)
  const isDarkMode = theme === 'dark'

  useEffect(() => {
    setTheme(window.__theme)
    window.__onThemeChange = () => setTheme(window.__theme)
  }, [])

  return (
    <S.MenuBarWrapper>
      <S.MenuBarGroup>
        <AniLink
          to="/"
          cover
          direction="right"
          bg={getThemeColor()}
          title="Voltar para Home"
        >
          <S.MenuBarItem>
            <Home />
          </S.MenuBarItem>
        </AniLink>
        <AniLink
          to="/search"
          cover
          direction="right"
          bg={getThemeColor()}
          title="Search"
          onClick={() => GA.searchClickTrack()}
        >
          <S.MenuBarItem>
            <Search />
          </S.MenuBarItem>
        </AniLink>
        <AniLink
          to="/cursos"
          cover
          direction="right"
          bg={getThemeColor()}
          title="Cursos"
          onClick={() => GA.courseClickTrack()}
        >
          <S.MenuBarItem>
            <GraduationCap />
            <S.MenuBarNotification />
          </S.MenuBarItem>
        </AniLink>
      </S.MenuBarGroup>

      <S.MenuBarGroup>
        <S.MenuBarItem
          title="Mudar o Tema"
          onClick={() => {
            GA.themeClickTrack(theme)
            window.__setPreferredTheme(isDarkMode ? 'light' : 'dark')
          }}
          className={theme}
          isDarkMode={isDarkMode}
        >
          <Light />
        </S.MenuBarItem>
        <S.MenuBarItem
          title="Ir para o Topo"
          onClick={() => {
            GA.topClickTrack()
            window.scroll({ top: 0, behavior: 'smooth' })
          }}
        >
          <Arrow />
        </S.MenuBarItem>
      </S.MenuBarGroup>
    </S.MenuBarWrapper>
  )
}

export default MenuBar
