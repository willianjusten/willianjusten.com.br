import 'lazysizes'
require('prismjs/themes/prism-tomorrow.css')

if (typeof window !== 'undefined') {
  // eslint-disable-next-line global-require
  var SmoothScroll = require('smooth-scroll')

  new SmoothScroll('a[href*="#"]', {
    speed: 200,
    offset: 66 // size of the header (sidebar) when mobile
  })
}

export const onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(
    `This application has been updated. ` +
      `Reload to display the latest version?`
  )

  if (answer === true) {
    window.location.reload()
  }
}
