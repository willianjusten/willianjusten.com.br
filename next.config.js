module.exports = {
  webpack: (config, { dev, isServer }) => {
    // Replace React with Preact only in client production build
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat'
      })
    }

    return config
  },
  async rewrites() {
    return [
      { source: '/js/', destination: 'https://willianjusten.com.br/' },
      { source: '/jekyll/', destination: 'https://willianjusten.com.br/' },
      { source: '/svg/', destination: 'https://willianjusten.com.br/' },
      { source: '/dev/', destination: 'https://willianjusten.com.br/' },
      { source: '/tags/', destination: 'https://willianjusten.com.br/' },
      {
        source: '/making-of-blog-novo/',
        destination:
          'https://willianjusten.com.br/making-of-blog-novo-gatsby-js'
      },
      { source: '/page/:slug*', destination: 'https://willianjusten.com.br/' }
    ]
  },
  async redirects() {
    return [
      {
        source: '/my-trips/',
        destination: 'https://my-trips.willianjusten.com.br/',
        permanent: true
      },
      {
        source: '/japanese-words/',
        destination: 'https://japanese-words.willianjusten.com.br/',
        permanent: true
      },
      {
        source: '/learn-japanese/',
        destination: 'https://learn-japanese.willianjusten.com.br/',
        permanent: true
      },
      {
        source: '/js-com-tdd-na-pratica-na-udemy/',
        destination: 'https://www.youtube.com/@WillianJustenCursos',
        permanent: true
      },
      {
        source: '/novo-curso-aprenda-criar-sites-animados-greensock/',
        destination: 'https://willianjusten.com.br',
        permanent: true
      },
      {
        source:
          '/novo-curso-gatsby-crie-um-site-pwa-com-react-graphql-netlify-cms/',
        destination: 'https://willianjusten.com.br',
        permanent: true
      }
    ]
  },
  images: { domains: ['pbs.twimg.com', 'avatars.githubusercontent.com'] }
}
