module.exports = {
  siteMetadata: {
    title: `Willian Justen - Desenvolvedor Front End`,
    description: `Um blog de um desenvolvedor Front End, fã de SVG, Javascript, React e novas tecnologias. Nômade Digital, atualmente trabalhando na Toptal e viajando o mundo.`,
    author: `@Willian_justen`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
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
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ]
}
