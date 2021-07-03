import Head from 'next/head'
import Layout from 'components/Layout'

import GlobalStyles from 'styles/global'
import NextNProgress from 'nextjs-progressbar'

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Willian Justen</title>
        <link rel="shortcut icon" href="/img/icon-512.png" />
        <link rel="apple-touch-icon" href="/img/icon-512.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#06092B" />
        <meta
          name="description"
          content="A simple project starter to work with TypeScript, React, NextJS and Styled Components"
        />
      </Head>
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
