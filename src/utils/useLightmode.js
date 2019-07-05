import { useState } from 'react'
import { checkLocalStorage } from '.'

function useLightMode() {
  let stored
  checkLocalStorage(() => {
    stored = localStorage.getItem('isLightMode')
  })

  const [isLightMode, setIsLightMode] = useState(
    stored === 'true' ? true : false
  )

  const setLightMode = () => {
    setIsLightMode(!isLightMode)
    checkLocalStorage(() => {
      localStorage.setItem('isLightMode', !isLightMode)
    })
  }

  return [isLightMode, setLightMode]
}

export default useLightMode
