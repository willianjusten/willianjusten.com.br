import React from 'react'
import { Link } from 'gatsby'

import links from './content'

const MenuLinks = () => (
  <ul>
    {links.map((link, i) => (
      <li key={i}>
        <Link to={link.url}>{link.label}</Link>
      </li>
    ))}
  </ul>
)

export default MenuLinks
