import React, { useEffect, useRef } from 'react'

const Comments = ({ title }) => {
  const commentBox = useRef(null)

  useEffect(() => {
    let scriptEl = document.createElement('script')
    scriptEl.setAttribute('theme', 'github-dark')
    scriptEl.setAttribute('src', 'https://utteranc.es/client.js')
    scriptEl.setAttribute('crossorigin', 'anonymous')
    scriptEl.setAttribute('repo', 'willianjusten/willianjusten.com.br')
    scriptEl.setAttribute('issue-term', 'title')
    commentBox.current.replaceChildren(scriptEl)
  }, [title])

  return <div ref={commentBox} />
}

export default Comments
