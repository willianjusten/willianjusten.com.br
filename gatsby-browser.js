import 'lazysizes'
import React from 'react'
import ReactDOM from 'react-dom'
import SwUpdater from './src/components/SwUpdater'

require('prismjs/themes/prism-tomorrow.css')

if (typeof window !== 'undefined') {
  // eslint-disable-next-line global-require
  require('smooth-scroll')('a[href*="#"]', {
    speed: 200,
    offset: 66 // size of the header (sidebar) when mobile
  })
}

function onServiceWorkerUpdateReady() {
  const root = document.createElement('div')
  document.body.appendChild(root)
  console.log('SW Asks for update!')

  ReactDOM.render(<SwUpdater />, root)
}

export { onServiceWorkerUpdateReady }

//// Happy Halloween
console.log('🎃🎃🎃 Happy Halloween 🎃🎃🎃')
console.log('Quer ganhar um curso na faixa??')
console.log(
  'Qual foi minha fantasia de Halloween do ano passado? Acerte e vá para https://${fantasia}Halloween.willianjusten.com.br"'
)
