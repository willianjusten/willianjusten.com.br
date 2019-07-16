import 'lazysizes'
require('prismjs/themes/prism-tomorrow.css')

if (typeof window !== 'undefined') {
  // eslint-disable-next-line global-require
  require('smooth-scroll')('a[href*="#"]', {
    speed: 200,
    offset: 66 // size of the header (sidebar) when mobile
  })
}
