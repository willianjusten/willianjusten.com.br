import Head from 'next/head'
import NextNProgress from 'nextjs-progressbar'

import { DefaultSeo } from 'next-seo'
import SEO from '../../next-seo.config'

import Layout from 'components/Layout'
import GlobalStyles from 'styles/global'

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Willian Justen</title>
        <link rel="shortcut icon" href="/assets/img/willianjusten-icon.png" />
        <link
          rel="apple-touch-icon"
          href="/assets/img/willianjusten-icon.png"
        />
        <meta name="theme-color" content="#06092B" />
        <meta
          name="google-site-verification"
          content="8kDtWUmUQEh7QXoj_shRaxcgYAVpHs_YQ7TeniN0kmI"
        />
        <meta
          name="description"
          content="Um blog de um desenvolvedor Front End, fã de SVG, Javascript, React e novas tecnologias. Nômade Digital, instrutor na Udemy e viajando o mundo."
        />
      </Head>
      <DefaultSeo {...SEO} />
      <GlobalStyles />
      <Layout>
        <NextNProgress
          color="#F231A5"
          startPosition={0.3}
          stopDelayMs={200}
          height={5}
          showSpinner={false}
        />
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default App
