import styled from 'styled-components'

export const NotificationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 10;
  width: 320px;
  right: calc(50vw - 320px / 2);
  padding: 20px 10px;
  border: 1px solid var(--borders);
  background: var(--mediumBackground);
  color: var(--texts);
  animation: moveUp 0.5s ease-in-out both;

  @keyframes moveUp {
    0% {
      bottom: -100vh;
    }
    100% {
      bottom: 60px;
    }
  }
`

export const IconWrapper = styled.div`
  margin-left: 10px;
  cursor: pointer;
  color: var(--texts);
  width: 30px;
  height: 30px;
`
