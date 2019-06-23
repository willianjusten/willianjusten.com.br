import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'

const Image = styled(Img)`
  width: 120px;
`

const CursosImage = props => (
  <StaticQuery
    query={graphql`
      query {
        images: allFile(
          filter: { absolutePath: { regex: "/static/assets/img/cursos/" } }
        ) {
          edges {
            node {
              relativePath
              name
              childImageSharp {
                sizes(maxWidth: 120) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
          }
        }
      }
    `}
    render={data => {
      const image = data.images.edges.find(n => {
        return n.node.relativePath.includes(props.filename)
      })
      if (!image) {
        return null
      }

      const imageSizes = image.node.childImageSharp.sizes
      return <Image alt={props.alt} sizes={imageSizes} />
    }}
  />
)

export default CursosImage
