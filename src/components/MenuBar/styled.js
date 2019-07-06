import styled from 'styled-components'
import media from 'styled-media-query'

export const MenuBarWrapper = styled.aside`
  align-items: center;
  background: var(--mediumBackground);
  border-left: 1px solid var(--borders);
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: space-between;
  padding: 0.8rem 0;
  position: fixed;
  right: 0;
  width: 3.75rem;

  ${media.lessThan('large')`
    bottom: 0;
    flex-direction: row;
    height: auto;
    padding: 0;
    position: fixed;
    width: 100%;
  `}
`

export const MenuBarGroup = styled.div`
  display: flex;
  flex-direction: column;

  ${media.lessThan('large')`
    flex-direction: row;
  `}
`

export const MenuBarItem = styled.span`
  color: ${props => (!props.isDarkMode ? 'var(--texts)' : '#eaea04')};
  cursor: pointer;
  display: block;
  height: 3.75rem;
  padding: 1.1rem;
  position: relative;
  width: 3.75rem;
  transition: color 0.5s;

  &:hover {
    color: var(--highlight);
  }

  ${media.lessThan('large')`
    height: 3rem;
    padding: 1.1rem;
    padding: .9rem;
    position: relative;
    width: 3rem;
  `}
`

export const MenuBarNotification = styled.span`
  background: red;
  border-radius: 50%;
  display: block;
  height: 0.4rem;
  position: absolute;
  right: 12px;
  top: 12px;
  width: 0.4rem;
`
