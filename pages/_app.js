import React from 'react'
import Head from 'next/head'

import pkg from '../package.json'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Memorize version {pkg.version}</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
