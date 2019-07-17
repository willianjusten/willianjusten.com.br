require('dotenv').config()

const queries = require('./src/utils/algolia_queries')

const pluginConfig = [
  `gatsby-plugin-twitter`,
  `gatsby-plugin-react-helmet`,
  `gatsby-plugin-transition-link`,
  {
    // keep as first gatsby-source-filesystem plugin for gatsby image support
    resolve: 'gatsby-source-filesystem',
    options: {
      path: `${__dirname}/static/assets/img`,
      name: 'uploads'
    }
  },
  `gatsby-plugin-sharp`,
  `gatsby-transformer-sharp`,
  {
    resolve: 'gatsby-transformer-remark',
    options: {
      plugins: [
        {
          resolve: 'gatsby-remark-relative-images',
          options: {
            name: 'uploads'
          }
        },
        {
          resolve: 'gatsby-remark-images',
          options: {
            // It's important to specify the maxWidth (in pixels) of
            // the content container as this plugin uses this as the
            // base for generating different widths of each image.
            maxWidth: 960,
            linkImagesToOriginal: false
          }
        },
        {
          resolve: 'gatsby-remark-copy-linked-files',
          options: {
            destinationDir: 'static/assets/img/'
          }
        },
        `gatsby-remark-lazy-load`,
        `gatsby-remark-responsive-iframe`,
        `gatsby-remark-external-links`,
        {
          resolve: `gatsby-remark-autolink-headers`,
          options: {
            icon: false,
            removeAccents: true
          }
        },
        `gatsby-remark-prismjs`
      ]
    }
  },
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: `Willian Justen Blog`,
      short_name: `WJusten`,
      start_url: `/`,
      background_color: `#1C2938`,
      theme_color: `#1C2938`,
      display: `minimal-ui`,
      icon: `static/assets/img/willianjusten-icon.png`
    }
  },
  `gatsby-plugin-styled-components`,
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `posts`,
      path: `${__dirname}/posts`
    }
  },
  `gatsby-plugin-netlify-cms`,
  `gatsby-plugin-netlify`,
  {
    resolve: 'gatsby-plugin-netlify-cache',
    options: {
      cachePublic: true
    }
  },
  {
    resolve: `gatsby-plugin-feed`,
    options: {
      query: `
        {
          site {
            siteMetadata {
              title
              description
              siteUrl
              site_url: siteUrl
            }
          }
        }
      `,
      feeds: [
        {
          serialize: ({ query: { site, allMarkdownRemark } }) => {
            return allMarkdownRemark.edges.map(edge => {
              return Object.assign({}, edge.node.frontmatter, {
                description: edge.node.frontmatter.description,
                date: edge.node.frontmatter.date,
                url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                custom_elements: [{ 'content:encoded': edge.node.html }]
              })
            })
          },
          query: `
            {
              allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}) {
                edges {
                  node {
                    fields {
                      slug
                    }
                    frontmatter {
                      title
                      description
                      date
                    }
                    excerpt(truncate: true, pruneLength: 500, format: HTML)
                  }
                }
              }
            }
          `,
          output: '/feed.xml',
          title: 'Willian Justen Blog - RSS Feed'
        }
      ]
    }
  },
  `gatsby-plugin-offline`,
  `gatsby-plugin-sitemap`
]

if (process.env.CONTEXT === 'production') {
  const algolia = {
    resolve: `gatsby-plugin-algolia-search`,
    options: {
      appId: process.env.GATSBY_ALGOLIA_APP_ID,
      apiKey: process.env.ALGOLIA_ADMIN_KEY,
      queries,
      chunkSize: 10000, // default: 1000
      enablePartialUpdates: true
    }
  }

  const analytics = {
    resolve: `gatsby-plugin-google-analytics`,
    options: {
      trackingId: process.env.GOOGLE_ANALYTICS_ID,
      head: false
    }
  }

  pluginConfig.push(algolia)
  pluginConfig.push(analytics)
}

module.exports = {
  siteMetadata: {
    title: `Willian Justen`,
    position: 'Desenvolvedor Front End',
    description: `Um blog de um desenvolvedor Front End, fã de SVG, Javascript, React e novas tecnologias. Nômade Digital, atualmente trabalhando na Toptal e viajando o mundo.`,
    authorDescription: `Membro do Core Team da Toptal, escrevo sobre o mundo front end, viagens, vida pessoal e mais.`,
    author: `@Willian_justen`,
    siteUrl: 'https://willianjusten.com.br'
  },
  plugins: pluginConfig
}
