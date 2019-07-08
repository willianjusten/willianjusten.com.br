import ReactGA from 'react-ga'

export const searchClickTrack = () => {
  ReactGA.event({
    category: 'search',
    action: 'click',
    label: 'Search na Menu Bar'
  })
}

export const courseClickTrack = () => {
  ReactGA.event({
    category: 'cursos',
    action: 'click',
    label: 'Link Curso na Menu Bar'
  })
}

export const themeClickTrack = theme => {
  ReactGA.event({
    category: 'theme',
    action: 'click',
    label: `Usava ${theme} theme`
  })
}

export const topClickTrack = () => {
  ReactGA.event({
    category: 'top',
    action: 'click',
    label: `Top na Menu Bar`
  })
}
