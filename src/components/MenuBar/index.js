import React, { useState, useEffect } from 'react'

import { Home } from '@styled-icons/boxicons-solid/Home'
import { SearchAlt2 as Search } from '@styled-icons/boxicons-regular/SearchAlt2'
import { UpArrowAlt as Arrow } from '@styled-icons/boxicons-regular/UpArrowAlt'
import { Youtube } from '@styled-icons/boxicons-logos/Youtube'
import { LightBulb as Light } from '@styled-icons/entypo/LightBulb'
import { GraduationCap } from '@styled-icons/fa-solid/GraduationCap'
import { Menu } from '@styled-icons/boxicons-regular/Menu'

import getThemeColor from '../../utils/getThemeColor'

import * as S from './styled'
import * as GA from './trackers'

const MenuBar = ({ setIsMenuOpen, isMenuOpen }) => {
  const [theme, setTheme] = useState(null)

  const isDarkMode = theme === 'dark'

  if (theme !== null) {
    GA.themeTracker(theme)
  }

  useEffect(() => {
    setTheme(window.__theme)

    window.__onThemeChange = () => setTheme(window.__theme)
  }, [])

  const openMenu = () => {
    GA.menuTracker()
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <S.MenuBarWrapper>
      <S.MenuBarGroup>
        <S.MenuBarLink
          to="/"
          cover
          direction="right"
          bg={getThemeColor()}
          title="Voltar para Home"
          activeClassName="active"
        >
          <S.MenuBarItem>
            <Home />
          </S.MenuBarItem>
        </S.MenuBarLink>
        <S.MenuBarLink
          to="/search"
          cover
          direction="right"
          bg={getThemeColor()}
          title="Search"
          activeClassName="active"
        >
          <S.MenuBarItem onClick={() => GA.searchClickTrack()}>
            <Search />
          </S.MenuBarItem>
        </S.MenuBarLink>
        <S.MenuBarGroupDesktop>
          <S.MenuBarLink
            to="/cursos/"
            cover
            direction="right"
            bg={getThemeColor()}
            title="Cursos"
            activeClassName="active"
          >
            <S.MenuBarItem onClick={() => GA.courseClickTrack()}>
              <GraduationCap />
              <S.MenuBarNotification />
            </S.MenuBarItem>
          </S.MenuBarLink>
          <S.MenuBarExternalLink
            title="YouTube Videos"
            href="https://www.youtube.com/WillianJustenCursos/?sub_confirmation=1"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => GA.youTubeClickTrack()}
          >
            <S.MenuBarItem>
              <Youtube />
              <S.MenuBarNotification />
            </S.MenuBarItem>
          </S.MenuBarExternalLink>
        </S.MenuBarGroupDesktop>
      </S.MenuBarGroup>

      <S.MenuBarGroupMobile>
        <S.MenuBarGroup>
          <S.MenuBarItem title="Abrir Menu" onClick={openMenu}>
            <Menu />
          </S.MenuBarItem>
        </S.MenuBarGroup>
      </S.MenuBarGroupMobile>

      <S.MenuBarGroup>
        <S.MenuBarItem
          title="Mudar o Tema"
          onClick={() => {
            window.__setPreferredTheme(isDarkMode ? 'light' : 'dark')

            if (window.DISQUS !== undefined) {
              window.setTimeout(() => {
                window.DISQUS.reset({
                  reload: true
                })
              }, 300)
            }
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
