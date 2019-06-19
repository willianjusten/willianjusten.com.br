module.exports = {
  siteMetadata: {
    title: `Willian Justen`,
    position: 'Desenvolvedor Front End',
    description: `Um blog de um desenvolvedor Front End, fã de SVG, Javascript, React e novas tecnologias. Nômade Digital, atualmente trabalhando na Toptal e viajando o mundo.`,
    author: `@Willian_justen`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/assets/img`,
        name: 'uploads'
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/images`,
        name: `images`
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
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
              maxWidth: 1200
            }
          }
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
        icon: `src/images/willianjusten-icon.png`
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
    `gatsby-plugin-netlify-cms`
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ]
}
