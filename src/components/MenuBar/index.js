import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

import { Home } from '@styled-icons/boxicons-solid/Home'
import { SearchAlt2 as Search } from '@styled-icons/boxicons-regular/SearchAlt2'
import { UpArrowAlt as Arrow } from '@styled-icons/boxicons-regular/UpArrowAlt'
import { Youtube } from '@styled-icons/boxicons-logos/Youtube'
import { LightBulb as Light } from '@styled-icons/entypo/LightBulb'
import { GraduationCap } from '@styled-icons/fa-solid/GraduationCap'
import { Menu } from '@styled-icons/boxicons-regular/Menu'

import * as S from './styled'

const MenuBar = ({ setIsMenuOpen, isMenuOpen }) => {
  const router = useRouter()
  const [theme, setTheme] = useState(null)

  const isDarkMode = theme === 'dark'

  useEffect(() => {
    setTheme(window.__theme)
    window.__onThemeChange = () => setTheme(window.__theme)
  }, [])

  const openMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <S.MenuBarWrapper>
      <S.MenuBarGroup>
        <Link href="/" passHref>
          <S.MenuBarLink
            title="Voltar para Home"
            className={router.pathname === '/' ? 'active' : ''}
          >
            <S.MenuBarItem>
              <Home />
            </S.MenuBarItem>
          </S.MenuBarLink>
        </Link>

        <Link href="/search" passHref>
          <S.MenuBarLink
            title="Pesquisar no Blog"
            className={router.pathname === '/search' ? 'active' : ''}
          >
            <S.MenuBarItem>
              <Search />
            </S.MenuBarItem>
          </S.MenuBarLink>
        </Link>

        <S.MenuBarGroupDesktop>
          <Link href="/cursos/" passHref>
            <S.MenuBarLink
              className={router.pathname === '/cursos' ? 'active' : ''}
              title="Ver cursos"
            >
              <S.MenuBarItem>
                <GraduationCap />
                <S.MenuBarNotification />
              </S.MenuBarItem>
            </S.MenuBarLink>
          </Link>

          <S.MenuBarExternalLink
            title="YouTube Videos"
            href="https://www.youtube.com/WillianJustenCursos/?sub_confirmation=1"
            target="_blank"
            rel="noopener noreferrer"
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
          }}
          className={theme}
          isDarkMode={isDarkMode}
        >
          <Light />
        </S.MenuBarItem>
        <S.MenuBarItem
          title="Ir para o Topo"
          onClick={() => {
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
